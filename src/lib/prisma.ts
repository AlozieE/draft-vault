import { statSync } from "node:fs";
import { join } from "node:path";

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaClientMtimeMs?: number;
};

function getGeneratedClientMtimeMs(): number {
  return statSync(
    join(process.cwd(), "node_modules/.prisma/client/index.js"),
  ).mtimeMs;
}

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: ["error", "warn"],
  });
}

function getPrismaClient(): PrismaClient {
  const generatedClientMtimeMs = getGeneratedClientMtimeMs();

  if (
    process.env.NODE_ENV !== "production" &&
    globalForPrisma.prisma &&
    globalForPrisma.prismaClientMtimeMs !== generatedClientMtimeMs
  ) {
    void globalForPrisma.prisma.$disconnect();
    globalForPrisma.prisma = undefined;
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
    globalForPrisma.prismaClientMtimeMs = generatedClientMtimeMs;
  }

  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client, property, receiver);

    if (typeof value === "function") {
      return value.bind(client);
    }

    return value;
  },
});
