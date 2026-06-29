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
  position?: number;
  insertedText?: string;
  deletedText?: string;
  fullTextSnapshot?: string;
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
  position?: number | null;
  insertedText?: string | null;
  deletedText?: string | null;
  fullTextSnapshot?: string | null;
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

  if (event.position != null) {
    hashable.position = event.position;
  }

  if (event.insertedText != null) {
    hashable.insertedText = event.insertedText;
  }

  if (event.deletedText != null) {
    hashable.deletedText = event.deletedText;
  }

  if (event.fullTextSnapshot != null) {
    hashable.fullTextSnapshot = event.fullTextSnapshot;
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

type VerifyEventChainOptions = {
  validateGenesisLink?: boolean;
};

export async function verifyEventChain(
  events: WritingEvent[],
  options: VerifyEventChainOptions = {},
): Promise<boolean> {
  const { validateGenesisLink = true } = options;

  if (events.length === 0) {
    return true;
  }

  for (const [index, event] of events.entries()) {
    if (index === 0) {
      if (validateGenesisLink && event.previousHash !== GENESIS_HASH) {
        return false;
      }
    } else if (event.previousHash !== events[index - 1]!.eventHash) {
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
