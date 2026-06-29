import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";

const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token } =
  process.env;

const redis = url && token ? new Redis({ url, token }) : null;

function makeLimiter(
  limiter: ReturnType<typeof Ratelimit.slidingWindow>,
  prefix: string,
): Ratelimit | null {
  if (!redis) return null;
  return new Ratelimit({ redis, limiter, prefix });
}

// Public share page: 30 req/min per IP
const ipLimiter = makeLimiter(Ratelimit.slidingWindow(30, "1 m"), "rl:share");

// Authenticated actions (create/delete doc, share links, list docs): 60/min per user
const userLimiter = makeLimiter(Ratelimit.slidingWindow(60, "1 m"), "rl:user");

// Document content/title saves (autosave): 120/min per user+doc
const docWriteLimiter = makeLimiter(
  Ratelimit.slidingWindow(120, "1 m"),
  "rl:doc:write",
);

// Writing event recording (per keystroke): 600/min per user+doc
const writingEventLimiter = makeLimiter(
  Ratelimit.slidingWindow(600, "1 m"),
  "rl:doc:event",
);

async function enforce(limiter: Ratelimit | null, key: string): Promise<void> {
  if (!limiter) return;
  const { success } = await limiter.limit(key);
  if (!success) {
    throw new Error("Too many requests. Please wait a moment and try again.");
  }
}

async function isLimited(
  limiter: Ratelimit | null,
  key: string,
): Promise<boolean> {
  if (!limiter) return false;
  const { success } = await limiter.limit(key);
  return !success;
}

async function getIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
}

async function getClerkUserId(): Promise<string> {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");
  return userId;
}

/** Use in Server Components — returns true if the request should be blocked. */
export async function isSharePageRateLimited(): Promise<boolean> {
  const ip = await getIp();
  return isLimited(ipLimiter, ip);
}

/** Use in Server Actions — throws a user-friendly error if rate limited. */
export async function rateLimitByUser(): Promise<void> {
  const userId = await getClerkUserId();
  await enforce(userLimiter, userId);
}

/** Use for document content/title saves — keyed by user + document. */
export async function rateLimitByUserAndDocument(
  documentId: string,
): Promise<void> {
  const userId = await getClerkUserId();
  await enforce(docWriteLimiter, `${userId}:${documentId}`);
}

/** Use for writing event recording — very generous limit for fast typists. */
export async function rateLimitWritingEvent(documentId: string): Promise<void> {
  const userId = await getClerkUserId();
  await enforce(writingEventLimiter, `${userId}:${documentId}`);
}
