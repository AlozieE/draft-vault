import { describe, expect, it } from "vitest";

import {
  applyWritingEvent,
  replayEvents,
} from "@/lib/replay-engine";
import { buildEventsFromTyping, createTestWritingEvent } from "@/test/helpers/writing-events";

describe("applyWritingEvent", () => {
  it("reconstructs text from insert events", () => {
    const result = applyWritingEvent(
      "hello",
      createTestWritingEvent({
        type: "insert",
        position: 5,
        insertedText: " world",
      }),
    );

    expect(result).toBe("hello world");
  });

  it("reconstructs text from paste events", () => {
    const result = applyWritingEvent(
      "",
      createTestWritingEvent({
        type: "paste",
        position: 0,
        insertedText: "pasted text",
      }),
    );

    expect(result).toBe("pasted text");
  });

  it("removes text from delete events", () => {
    const result = applyWritingEvent(
      "hello world",
      createTestWritingEvent({
        type: "delete",
        position: 5,
        deletedText: " world",
      }),
    );

    expect(result).toBe("hello");
  });

  it("preserves spaces in insert events", () => {
    const result = applyWritingEvent(
      "word",
      createTestWritingEvent({
        type: "insert",
        position: 4,
        insertedText: " another",
      }),
    );

    expect(result).toBe("word another");
  });
});

describe("replayEvents", () => {
  it('replays "testing testing testing" exactly', async () => {
    const target = "testing testing testing";
    const events = await buildEventsFromTyping(target);

    expect(replayEvents(events, events.length - 1)).toBe(target);
  });

  it("replays word chunks with spaces preserved", async () => {
    const events = await buildEventsFromTyping("testing testing testing");

    expect(replayEvents(events, events.length - 1)).toBe(
      "testing testing testing",
    );
  });

  it("returns an empty string before any events are applied", () => {
    expect(replayEvents([], -1)).toBe("");
  });
});
