import type { Document as PrismaDocument } from "@prisma/client";

import type { Document, DocumentListItem } from "@/types/document";

type DashboardDocumentRecord = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    writingEvents: number;
  };
};

export function mapDocument(record: PrismaDocument): Document {
  return {
    id: record.id,
    title: record.title,
    content: record.content,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}

export function mapDashboardDocument(
  record: DashboardDocumentRecord,
): DocumentListItem {
  return {
    id: record.id,
    title: record.title,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
    eventCount: record._count.writingEvents,
  };
}
