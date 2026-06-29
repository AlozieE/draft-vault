import { describe, expect, it } from "vitest";

import { GENESIS_HASH } from "@/lib/constants";
import { createWritingEvent } from "@/lib/writing-event-factory";

const baseInput = {
  documentId: "doc-1",
  type: "insert" as const,
  contentLengthChange: 7,
  wordCount: 1,
  characterCount: 7,
  position: 0,
  insertedText: "testing",
};

describe("createWritingEvent", () => {
  it("returns the provided previousHash", async () => {
    const event = await createWritingEvent({
      ...baseInput,
      previousHash: "custom-previous-hash",
    });

    expect(event.previousHash).toBe("custom-previous-hash");
  });

  it("defaults previousHash to genesis", async () => {
    const event = await createWritingEvent(baseInput);

    expect(event.previousHash).toBe(GENESIS_HASH);
  });

  it("creates an eventHash", async () => {
    const event = await createWritingEvent(baseInput);

    expect(event.eventHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it("changes the hash when event data changes", async () => {
    const firstEvent = await createWritingEvent(baseInput);
    const secondEvent = await createWritingEvent({
      ...baseInput,
      insertedText: "changed",
    });

    expect(secondEvent.eventHash).not.toBe(firstEvent.eventHash);
  });

  it("preserves operation fields on the created event", async () => {
    const event = await createWritingEvent({
      documentId: "doc-1",
      type: "insert",
      contentLengthChange: 8,
      wordCount: 2,
      characterCount: 15,
      position: 7,
      insertedText: " testing",
      deletedText: undefined,
      fullTextSnapshot: undefined,
      textPreview: "+ testing",
    });

    expect(event.position).toBe(7);
    expect(event.insertedText).toBe(" testing");
    expect(event.textPreview).toBe("+ testing");
    expect(event.deletedText).toBeUndefined();
    expect(event.fullTextSnapshot).toBeUndefined();
  });

  it("preserves delete operation fields", async () => {
    const event = await createWritingEvent({
      documentId: "doc-1",
      type: "delete",
      contentLengthChange: -5,
      wordCount: 0,
      characterCount: 0,
      position: 0,
      deletedText: "draft",
    });

    expect(event.position).toBe(0);
    expect(event.deletedText).toBe("draft");
  });
});
