import { GENESIS_HASH } from "@/lib/constants";
import type { WritingEvent, WritingEventType } from "@/types/writing-event";

export type HashableEventData = {
  id: string;
  documentId: string;
  type: WritingEventType;
  timestamp: string;
  contentLengthChange: number;
  wordCount: number;
  characterCount: number;
  textPreview?: string;
  previousHash: string;
};

type HashableEventInput = {
  id: string;
  documentId: string;
  type: WritingEventType;
  timestamp: string | Date;
  contentLengthChange: number;
  wordCount: number;
  characterCount: number;
  textPreview?: string | null;
  previousHash: string;
};

export function toIsoTimestamp(timestamp: string | Date): string {
  return timestamp instanceof Date ? timestamp.toISOString() : timestamp;
}

export function getHashableEventData(
  event: HashableEventInput,
): HashableEventData {
  const hashable: HashableEventData = {
    id: event.id,
    documentId: event.documentId,
    type: event.type,
    timestamp: toIsoTimestamp(event.timestamp),
    contentLengthChange: event.contentLengthChange,
    wordCount: event.wordCount,
    characterCount: event.characterCount,
    previousHash: event.previousHash,
  };

  if (event.textPreview != null) {
    hashable.textPreview = event.textPreview;
  }

  return hashable;
}

export async function createSha256Hash(input: string): Promise<string> {
  const encodedInput = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", encodedInput);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createEventHash(
  event: HashableEventInput,
): Promise<string> {
  return createSha256Hash(JSON.stringify(getHashableEventData(event)));
}

export async function verifyEventChain(
  events: WritingEvent[],
): Promise<boolean> {
  if (events.length === 0) {
    return true;
  }

  for (const [index, event] of events.entries()) {
    const expectedPreviousHash =
      index === 0 ? GENESIS_HASH : events[index - 1]!.eventHash;

    if (event.previousHash !== expectedPreviousHash) {
      return false;
    }

    const expectedHash = await createEventHash(event);

    if (event.eventHash !== expectedHash) {
      return false;
    }
  }

  return true;
}

export function getPreviousEventHash(events: WritingEvent[]): string {
  return events.at(-1)?.eventHash ?? GENESIS_HASH;
}
