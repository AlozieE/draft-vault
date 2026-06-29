import { auth, currentUser } from "@clerk/nextjs/server";
import type { User } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export class NotAuthenticatedError extends Error {
  constructor() {
    super("Not authenticated");
    this.name = "NotAuthenticatedError";
  }
}

export async function getOrCreateCurrentUser(): Promise<User> {
  const { userId } = await auth();

  if (!userId) {
    throw new NotAuthenticatedError();
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (existingUser) {
    return existingUser;
  }

  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new NotAuthenticatedError();
  }

  const email = clerkUser.primaryEmailAddress?.emailAddress;

  if (!email) {
    throw new Error("Clerk user has no primary email address");
  }

  const name = clerkUser.fullName ?? clerkUser.firstName ?? null;

  try {
    return await prisma.user.create({
      data: {
        clerkUserId: userId,
        email,
        name,
      },
    });
  } catch {
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (user) {
      return user;
    }

    throw new Error("Failed to create user record");
  }
}
