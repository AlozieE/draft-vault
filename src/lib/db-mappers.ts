import type { Document as PrismaDocument } from "@prisma/client";

import type { Document } from "@/types/document";

export function mapDocument(record: PrismaDocument): Document {
  return {
    id: record.id,
    title: record.title,
    content: record.content,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
