import { GENESIS_HASH } from "@/lib/constants";
import { computeEventHash } from "@/lib/hash-chain";
import type { WritingEvent, WritingEventType } from "@/types/writing-event";

export function createWritingEvent(
  documentId: string,
  type: WritingEventType,
  previousHash: string = GENESIS_HASH,
  content?: string,
): WritingEvent {
  const id = crypto.randomUUID();
  const timestamp = Date.now();
  const base = { id, documentId, type, timestamp, content, previousHash };

  return {
    ...base,
    hash: computeEventHash(base),
  };
}
