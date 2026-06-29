import { describe, expect, it } from "vitest";

import {
  countEventsByType,
  createAuthorshipReport,
  getFinalCharacterCount,
  getFinalEventHash,
  getFinalWordCount,
} from "@/lib/report-metrics";
import { createTestWritingEvent } from "@/test/helpers/writing-events";

describe("report-metrics", () => {
  const events = [
    createTestWritingEvent({
      id: "event-1",
      type: "insert",
      timestamp: "2026-06-29T10:00:00.000Z",
      wordCount: 1,
      characterCount: 3,
      eventHash: "hash-1",
    }),
    createTestWritingEvent({
      id: "event-2",
      type: "delete",
      timestamp: "2026-06-29T10:05:00.000Z",
      wordCount: 1,
      characterCount: 2,
      eventHash: "hash-2",
      previousHash: "hash-1",
    }),
    createTestWritingEvent({
      id: "event-3",
      type: "paste",
      timestamp: "2026-06-29T10:10:00.000Z",
      wordCount: 4,
      characterCount: 20,
      eventHash: "hash-final",
      previousHash: "hash-2",
    }),
    createTestWritingEvent({
      id: "event-4",
      type: "snapshot",
      timestamp: "2026-06-29T10:15:00.000Z",
      wordCount: 4,
      characterCount: 20,
      eventHash: "hash-snapshot",
      previousHash: "hash-final",
      fullTextSnapshot: "snapshot content",
    }),
  ];

  it("counts total events correctly", () => {
    const report = createAuthorshipReport(events, true);

    expect(report.totalEvents).toBe(4);
  });

  it("counts event types correctly", () => {
    const counts = countEventsByType(events);
    const report = createAuthorshipReport(events, true);

    expect(counts).toEqual({
      insert: 1,
      delete: 1,
      paste: 1,
      snapshot: 1,
    });
    expect(report.insertEvents).toBe(1);
    expect(report.deleteEvents).toBe(1);
    expect(report.pasteEvents).toBe(1);
    expect(report.snapshotEvents).toBe(1);
  });

  it("calculates final word and character counts from the last event", () => {
    expect(getFinalWordCount(events)).toBe(4);
    expect(getFinalCharacterCount(events)).toBe(20);

    const report = createAuthorshipReport(events, true);
    expect(report.finalWordCount).toBe(4);
    expect(report.finalCharacterCount).toBe(20);
  });

  it("returns the final event hash from the last event", () => {
    expect(getFinalEventHash(events)).toBe("hash-snapshot");

    const report = createAuthorshipReport(events, true);
    expect(report.finalEventHash).toBe("hash-snapshot");
  });

  it("includes chain validity in the authorship report", () => {
    expect(createAuthorshipReport(events, true).chainIsValid).toBe(true);
    expect(createAuthorshipReport(events, false).chainIsValid).toBe(false);
  });
});
