import assert from "node:assert/strict";

import { GENESIS_HASH } from "../src/lib/constants.ts";
import { computeTextChanges } from "../src/lib/text-change.ts";
import { replayEvents } from "../src/lib/replay-engine.ts";
import { createWritingEvent } from "../src/lib/writing-event-factory.ts";
import type { WritingEvent } from "../src/types/writing-event.ts";

async function buildEventsFromTyping(
  startText: string,
  targetText: string,
): Promise<WritingEvent[]> {
  const events: WritingEvent[] = [];
  let previousText = startText;
  let previousHash = GENESIS_HASH;

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

async function buildEventsFromWordChunks(
  startText: string,
  chunks: string[],
): Promise<WritingEvent[]> {
  const events: WritingEvent[] = [];
  let previousText = startText;
  let previousHash = GENESIS_HASH;

  for (const chunk of chunks) {
    const currentText = previousText + chunk;
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

const target = "testing testing testing";

const charEvents = await buildEventsFromTyping(
  "Start writing your draft here...",
  target,
);
assert.equal(replayEvents(charEvents, charEvents.length - 1), target);

const wordEvents = await buildEventsFromWordChunks("", [
  "testing",
  " testing",
  " testing",
]);
assert.equal(replayEvents(wordEvents, wordEvents.length - 1), target);

const repeatedSubstringChange = computeTextChanges(
  "testing testing",
  "testing testing testing",
);
assert.deepEqual(repeatedSubstringChange, [
  { type: "insert", position: 15, insertedText: " testing" },
]);

console.log("replay-engine tests passed");
