"use server";

import { assertDocumentOwnership } from "@/lib/document-ownership";
import { createEventHash } from "@/lib/hash-chain";
import { prisma } from "@/lib/prisma";
import {
  mapWritingEventRecordToWritingEvent,
  mapWritingEventRecordsToWritingEvents,
} from "@/lib/writing-event-mapper";
import type { WritingEvent, WritingEventType } from "@/types/writing-event";

const TEXT_PREVIEW_MAX_CHARS = 500;
const TEXT_FIELD_MAX_CHARS = 100_000;
const SNAPSHOT_MAX_CHARS = 500_000;

export type CreateWritingEventRecordInput = {
  id: string;
  documentId: string;
  type: WritingEventType;
  timestamp: string;
  contentLengthChange: number;
  wordCount: number;
  characterCount: number;
  textPreview?: string;
  position?: number;
  insertedText?: string;
  deletedText?: string;
  fullTextSnapshot?: string;
  previousHash: string;
  eventHash: string;
};

async function loadWritingEvents(documentId: string): Promise<WritingEvent[]> {
  const events = await prisma.writingEvent.findMany({
    where: { documentId },
    orderBy: [{ timestamp: "asc" }, { createdAt: "asc" }],
  });

  return mapWritingEventRecordsToWritingEvents(events);
}

export async function getWritingEvents(
  documentId: string,
): Promise<WritingEvent[]> {
  await assertDocumentOwnership(documentId);
  return loadWritingEvents(documentId);
}

export async function getWritingEventsForSharedDocument(
  documentId: string,
): Promise<WritingEvent[]> {
  return loadWritingEvents(documentId);
}

export async function getRecentWritingEvents(
  documentId: string,
  limit = 50,
): Promise<WritingEvent[]> {
  await assertDocumentOwnership(documentId);

  const events = await prisma.writingEvent.findMany({
    where: { documentId },
    orderBy: [{ timestamp: "desc" }, { createdAt: "desc" }],
    take: limit,
  });

  return mapWritingEventRecordsToWritingEvents(events.reverse());
}

export async function createWritingEventRecord(
  input: CreateWritingEventRecordInput,
): Promise<WritingEvent> {
  await assertDocumentOwnership(input.documentId);

  if (input.textPreview && input.textPreview.length > TEXT_PREVIEW_MAX_CHARS) {
    throw new Error("Writing event text preview exceeds maximum size");
  }
  if (input.insertedText && input.insertedText.length > TEXT_FIELD_MAX_CHARS) {
    throw new Error("Writing event inserted text exceeds maximum size");
  }
  if (input.deletedText && input.deletedText.length > TEXT_FIELD_MAX_CHARS) {
    throw new Error("Writing event deleted text exceeds maximum size");
  }
  if (
    input.fullTextSnapshot &&
    input.fullTextSnapshot.length > SNAPSHOT_MAX_CHARS
  ) {
    throw new Error("Writing event snapshot exceeds maximum size");
  }

  const serverTimestamp = new Date();
  const serverEventHash = await createEventHash({
    id: input.id,
    documentId: input.documentId,
    type: input.type,
    timestamp: serverTimestamp,
    contentLengthChange: input.contentLengthChange,
    wordCount: input.wordCount,
    characterCount: input.characterCount,
    textPreview: input.textPreview,
    position: input.position,
    insertedText: input.insertedText,
    deletedText: input.deletedText,
    fullTextSnapshot: input.fullTextSnapshot,
    previousHash: input.previousHash,
  });

  const event = await prisma.writingEvent.create({
    data: {
      id: input.id,
      documentId: input.documentId,
      type: input.type,
      timestamp: serverTimestamp,
      contentLengthChange: input.contentLengthChange,
      wordCount: input.wordCount,
      characterCount: input.characterCount,
      textPreview: input.textPreview,
      ...(input.position !== undefined ? { position: input.position } : {}),
      ...(input.insertedText !== undefined
        ? { insertedText: input.insertedText }
        : {}),
      ...(input.deletedText !== undefined
        ? { deletedText: input.deletedText }
        : {}),
      ...(input.fullTextSnapshot !== undefined
        ? { fullTextSnapshot: input.fullTextSnapshot }
        : {}),
      previousHash: input.previousHash,
      eventHash: serverEventHash,
    },
  });

  return mapWritingEventRecordToWritingEvent(event);
}

export async function clearWritingEvents(
  documentId: string,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await assertDocumentOwnership(documentId);

    await prisma.writingEvent.deleteMany({
      where: { documentId },
    });

    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete writing events";

    return { success: false, error: message };
  }
}
