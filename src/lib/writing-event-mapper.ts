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

function mapOptionalString(value: string | null): string | undefined {
  return value ?? undefined;
}

function mapOptionalNumber(value: number | null): number | undefined {
  return value ?? undefined;
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
    textPreview: mapOptionalString(record.textPreview),
    position: mapOptionalNumber(record.position),
    insertedText: mapOptionalString(record.insertedText),
    deletedText: mapOptionalString(record.deletedText),
    fullTextSnapshot: mapOptionalString(record.fullTextSnapshot),
    previousHash: record.previousHash,
    eventHash: record.eventHash,
  };
}

export function mapWritingEventRecordsToWritingEvents(
  records: PrismaWritingEvent[],
): WritingEvent[] {
  return records.map(mapWritingEventRecordToWritingEvent);
}
