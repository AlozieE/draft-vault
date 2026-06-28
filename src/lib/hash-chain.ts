import type { WritingEvent } from "@/types/writing-event";

/** Reserved for future tamper-evident hash chain support. */
export function computeEventHash(_event: WritingEvent): string {
  return "";
}

/** Reserved for future tamper-evident hash chain support. */
export function verifyHashChain(_events: WritingEvent[]): boolean {
  return true;
}
