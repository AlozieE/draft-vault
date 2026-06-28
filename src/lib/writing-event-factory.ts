import { GENESIS_HASH } from "@/lib/constants";
import { createEventHash } from "@/lib/hash-chain";
import type { WritingEvent, WritingEventInput } from "@/types/writing-event";

export type CreateWritingEventInput = WritingEventInput & {
  previousHash?: string;
};

export async function createWritingEvent({
  documentId,
  type,
  contentLengthChange,
  wordCount,
  characterCount,
  textPreview,
  previousHash = GENESIS_HASH,
}: CreateWritingEventInput): Promise<WritingEvent> {
  const eventData = {
    id: crypto.randomUUID(),
    documentId,
    type,
    timestamp: new Date().toISOString(),
    contentLengthChange,
    wordCount,
    characterCount,
    ...(textPreview !== undefined ? { textPreview } : {}),
  };

  const eventHash = await createEventHash(eventData, previousHash);

  return {
    ...eventData,
    previousHash,
    eventHash,
  };
}
