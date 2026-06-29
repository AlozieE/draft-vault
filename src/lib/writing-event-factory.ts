import { GENESIS_HASH } from "@/lib/constants";
import { createEventHash } from "@/lib/hash-chain";
import type { WritingEvent, WritingEventInput } from "@/types/writing-event";

export type CreateWritingEventInput = WritingEventInput & {
  previousHash?: string;
};

type OptionalWritingEventFields = Pick<
  WritingEventInput,
  "textPreview" | "position" | "insertedText" | "deletedText" | "fullTextSnapshot"
>;

function includeOptionalEventFields(input: OptionalWritingEventFields) {
  return {
    ...(input.textPreview !== undefined ? { textPreview: input.textPreview } : {}),
    ...(input.position !== undefined ? { position: input.position } : {}),
    ...(input.insertedText !== undefined
      ? { insertedText: input.insertedText }
      : {}),
    ...(input.deletedText !== undefined ? { deletedText: input.deletedText } : {}),
    ...(input.fullTextSnapshot !== undefined
      ? { fullTextSnapshot: input.fullTextSnapshot }
      : {}),
  };
}

export async function createWritingEvent(
  input: CreateWritingEventInput,
): Promise<WritingEvent> {
  const {
    documentId,
    type,
    contentLengthChange,
    wordCount,
    characterCount,
    previousHash = GENESIS_HASH,
    ...optionalFields
  } = input;

  const eventData = {
    id: crypto.randomUUID(),
    documentId,
    type,
    timestamp: new Date().toISOString(),
    contentLengthChange,
    wordCount,
    characterCount,
    ...includeOptionalEventFields(optionalFields),
    previousHash,
  };

  const eventHash = await createEventHash(eventData);

  return {
    ...eventData,
    eventHash,
  };
}
