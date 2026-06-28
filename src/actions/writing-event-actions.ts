"use server";

import { prisma } from "@/lib/prisma";
import { mapWritingEvent } from "@/lib/db-mappers";
import type { WritingEvent, WritingEventType } from "@/types/writing-event";

export type CreateWritingEventRecordInput = {
  documentId: string;
  type: WritingEventType;
  timestamp: string;
  contentLengthChange: number;
  wordCount: number;
  characterCount: number;
  textPreview?: string;
  previousHash: string;
  eventHash: string;
};

export async function getWritingEvents(
  documentId: string,
): Promise<WritingEvent[]> {
  const events = await prisma.writingEvent.findMany({
    where: { documentId },
    orderBy: { timestamp: "asc" },
  });

  return events.map(mapWritingEvent);
}

export async function createWritingEventRecord(
  input: CreateWritingEventRecordInput,
): Promise<WritingEvent> {
  const event = await prisma.writingEvent.create({
    data: {
      documentId: input.documentId,
      type: input.type,
      timestamp: new Date(input.timestamp),
      contentLengthChange: input.contentLengthChange,
      wordCount: input.wordCount,
      characterCount: input.characterCount,
      textPreview: input.textPreview,
      previousHash: input.previousHash,
      eventHash: input.eventHash,
    },
  });

  return mapWritingEvent(event);
}

export async function clearWritingEvents(documentId: string): Promise<void> {
  await prisma.writingEvent.deleteMany({
    where: { documentId },
  });
}
