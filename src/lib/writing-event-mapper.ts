import type { WritingEvent as PrismaWritingEvent } from "@prisma/client";

import { toIsoTimestamp } from "@/lib/hash-chain";
import type { WritingEvent, WritingEventType } from "@/types/writing-event";

const WRITING_EVENT_TYPES = new Set<WritingEventType>([
  "insert",
  "delete",
  "paste",
  "snapshot",
]);

function toWritingEventType(type: string): WritingEventType {
  if (WRITING_EVENT_TYPES.has(type as WritingEventType)) {
    return type as WritingEventType;
  }

  return "insert";
}

export function mapWritingEventRecordToWritingEvent(
  record: PrismaWritingEvent,
): WritingEvent {
  return {
    id: record.id,
    documentId: record.documentId,
    type: toWritingEventType(record.type),
    timestamp: toIsoTimestamp(record.timestamp),
    contentLengthChange: record.contentLengthChange,
    wordCount: record.wordCount,
    characterCount: record.characterCount,
    textPreview: record.textPreview ?? undefined,
    previousHash: record.previousHash,
    eventHash: record.eventHash,
  };
}

export function mapWritingEventRecordsToWritingEvents(
  records: PrismaWritingEvent[],
): WritingEvent[] {
  return records.map(mapWritingEventRecordToWritingEvent);
}
