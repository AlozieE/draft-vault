import { GENESIS_HASH } from "@/lib/constants";
import { computeTextChanges } from "@/lib/text-change";
import { createWritingEvent } from "@/lib/writing-event-factory";
import type { WritingEvent } from "@/types/writing-event";

export function createTestWritingEvent(
  overrides: Partial<WritingEvent> = {},
): WritingEvent {
  return {
    id: "event-1",
    documentId: "doc-1",
    type: "insert",
    timestamp: "2026-06-29T10:00:00.000Z",
    contentLengthChange: 1,
    wordCount: 1,
    characterCount: 1,
    previousHash: GENESIS_HASH,
    eventHash: "hash-1",
    ...overrides,
  };
}

export async function buildEventsFromTyping(
  targetText: string,
  startText = "",
): Promise<WritingEvent[]> {
  const events: WritingEvent[] = [];
  let previousText = startText;
  let previousHash = events.at(-1)?.eventHash ?? GENESIS_HASH;

  for (let index = 0; index < targetText.length; index++) {
    const currentText = targetText.slice(0, index + 1);
    const changes = computeTextChanges(previousText, currentText);

    for (const change of changes) {
      if (change.type === "insert") {
        const event = await createWritingEvent({
          documentId: "doc-1",
          type: change.insertedText.length > 1 ? "paste" : "insert",
          contentLengthChange: change.insertedText.length,
          wordCount: currentText.trim().split(/\s+/).filter(Boolean).length,
          characterCount: currentText.length,
          position: change.position,
          insertedText: change.insertedText,
          previousHash,
        });
        events.push(event);
        previousHash = event.eventHash;
        continue;
      }

      const event = await createWritingEvent({
        documentId: "doc-1",
        type: "delete",
        contentLengthChange: -change.deletedText.length,
        wordCount: currentText.trim().split(/\s+/).filter(Boolean).length,
        characterCount: currentText.length,
        position: change.position,
        deletedText: change.deletedText,
        previousHash,
      });
      events.push(event);
      previousHash = event.eventHash;
    }

    previousText = currentText;
  }

  return events;
}
