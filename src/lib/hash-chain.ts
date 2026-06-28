import type { WritingEvent } from "@/types/writing-event";

export function computeEventHash(
  event: Omit<WritingEvent, "hash">,
): string {
  return `${event.previousHash}-${event.id}-${event.timestamp}`;
}

export function verifyHashChain(events: WritingEvent[]): boolean {
  if (events.length === 0) {
    return true;
  }

  return events.every((event, index) => {
    if (index === 0) {
      return event.previousHash === "genesis";
    }

    return event.previousHash === events[index - 1]!.hash;
  });
}
