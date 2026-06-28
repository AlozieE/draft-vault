import type { Document as PrismaDocument, WritingEvent as PrismaWritingEvent } from "@prisma/client";

import type { Document } from "@/types/document";
import type { WritingEvent, WritingEventType } from "@/types/writing-event";

export function mapDocument(record: PrismaDocument): Document {
  return {
    id: record.id,
    title: record.title,
    content: record.content,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}

export function mapWritingEvent(record: PrismaWritingEvent): WritingEvent {
  return {
    id: record.id,
    documentId: record.documentId,
    type: record.type as WritingEventType,
    timestamp: record.timestamp.toISOString(),
    contentLengthChange: record.contentLengthChange,
    wordCount: record.wordCount,
    characterCount: record.characterCount,
    textPreview: record.textPreview ?? undefined,
    previousHash: record.previousHash,
    eventHash: record.eventHash,
  };
}
