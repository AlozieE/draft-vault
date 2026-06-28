import { GENESIS_HASH } from "@/lib/constants";
import type { WritingEvent } from "@/types/writing-event";

export async function createSha256Hash(input: string): Promise<string> {
  const encodedInput = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", encodedInput);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createEventHash(
  eventData: object,
  previousHash: string,
): Promise<string> {
  return createSha256Hash(JSON.stringify({ ...eventData, previousHash }));
}

function getEventDataForHash(event: WritingEvent): object {
  const {
    eventHash: _eventHash,
    previousHash: _previousHash,
    ...eventData
  } = event;

  return eventData;
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

    const expectedHash = await createEventHash(
      getEventDataForHash(event),
      event.previousHash,
    );

    if (event.eventHash !== expectedHash) {
      return false;
    }
  }

  return true;
}

export function getPreviousEventHash(events: WritingEvent[]): string {
  return events.at(-1)?.eventHash ?? GENESIS_HASH;
}
