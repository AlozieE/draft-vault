import { describe, expect, it } from "vitest";

import { GENESIS_HASH } from "@/lib/constants";
import {
  createEventHash,
  createSha256Hash,
  verifyEventChain,
} from "@/lib/hash-chain";
import { createWritingEvent } from "@/lib/writing-event-factory";

const baseEventInput = {
  documentId: "doc-1",
  type: "insert" as const,
  contentLengthChange: 1,
  wordCount: 1,
  characterCount: 1,
  position: 0,
  insertedText: "a",
};

describe("createSha256Hash", () => {
  it("returns the same hash for the same input", async () => {
    const firstHash = await createSha256Hash("draft-vault");
    const secondHash = await createSha256Hash("draft-vault");

    expect(firstHash).toBe(secondHash);
  });

  it("returns different hashes for different input", async () => {
    const firstHash = await createSha256Hash("draft-vault");
    const secondHash = await createSha256Hash("tampered-vault");

    expect(firstHash).not.toBe(secondHash);
  });
});

describe("verifyEventChain", () => {
  it("returns true for an empty chain", async () => {
    await expect(verifyEventChain([])).resolves.toBe(true);
  });

  it("returns true for a valid chain", async () => {
    const firstEvent = await createWritingEvent(baseEventInput);
    const secondEvent = await createWritingEvent({
      ...baseEventInput,
      insertedText: "b",
      position: 1,
      contentLengthChange: 1,
      characterCount: 2,
      previousHash: firstEvent.eventHash,
    });

    await expect(verifyEventChain([firstEvent, secondEvent])).resolves.toBe(
      true,
    );
  });

  it("returns false if an event is tampered with", async () => {
    const event = await createWritingEvent(baseEventInput);
    const tamperedEvent = {
      ...event,
      insertedText: "tampered",
    };

    await expect(verifyEventChain([tamperedEvent])).resolves.toBe(false);
  });

  it("returns false if previousHash does not match", async () => {
    const event = await createWritingEvent({
      ...baseEventInput,
      previousHash: "invalid-previous-hash",
    });

    await expect(verifyEventChain([event])).resolves.toBe(false);
  });

  it("links each event to the previous event hash after genesis", async () => {
    const firstEvent = await createWritingEvent(baseEventInput);
    const secondEvent = await createWritingEvent({
      ...baseEventInput,
      insertedText: "b",
      position: 1,
      previousHash: firstEvent.eventHash,
    });

    expect(firstEvent.previousHash).toBe(GENESIS_HASH);
    expect(secondEvent.previousHash).toBe(firstEvent.eventHash);
    expect(await createEventHash(secondEvent)).toBe(secondEvent.eventHash);
  });
});
