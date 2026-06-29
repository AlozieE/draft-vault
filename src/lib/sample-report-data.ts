import { GENESIS_HASH } from "@/lib/constants";
import { createAuthorshipReport } from "@/lib/report-metrics";
import type { AuthorshipReport } from "@/lib/report-metrics";
import type { WritingEvent } from "@/types/writing-event";

export const SAMPLE_DOCUMENT_TITLE = "Sample Research Essay";

export const SAMPLE_DOCUMENT_DESCRIPTION =
  "This page shows example authorship evidence only. No database records are created or modified.";

export const SAMPLE_WRITING_EVENTS: WritingEvent[] = [
  {
    id: "sample-event-1",
    documentId: "sample",
    type: "insert",
    timestamp: "2026-06-15T09:00:00.000Z",
    contentLengthChange: 6,
    wordCount: 1,
    characterCount: 6,
    position: 0,
    insertedText: "Draft ",
    previousHash: GENESIS_HASH,
    eventHash: "sample-event-hash-1",
  },
  {
    id: "sample-event-2",
    documentId: "sample",
    type: "insert",
    timestamp: "2026-06-15T09:01:12.000Z",
    contentLengthChange: 5,
    wordCount: 2,
    characterCount: 11,
    position: 6,
    insertedText: "Vault",
    previousHash: "sample-event-hash-1",
    eventHash: "sample-event-hash-2",
  },
  {
    id: "sample-event-3",
    documentId: "sample",
    type: "insert",
    timestamp: "2026-06-15T09:02:45.000Z",
    contentLengthChange: 7,
    wordCount: 3,
    characterCount: 18,
    position: 11,
    insertedText: " sample",
    previousHash: "sample-event-hash-2",
    eventHash: "sample-event-hash-3",
  },
  {
    id: "sample-event-4",
    documentId: "sample",
    type: "delete",
    timestamp: "2026-06-15T09:03:10.000Z",
    contentLengthChange: -1,
    wordCount: 3,
    characterCount: 17,
    position: 17,
    deletedText: "e",
    previousHash: "sample-event-hash-3",
    eventHash: "sample-event-hash-4",
  },
  {
    id: "sample-event-5",
    documentId: "sample",
    type: "insert",
    timestamp: "2026-06-15T09:03:28.000Z",
    contentLengthChange: 8,
    wordCount: 4,
    characterCount: 25,
    position: 17,
    insertedText: " essay.",
    previousHash: "sample-event-hash-4",
    eventHash: "sample-event-hash-5",
  },
  {
    id: "sample-event-6",
    documentId: "sample",
    type: "paste",
    timestamp: "2026-06-15T09:05:00.000Z",
    contentLengthChange: 28,
    wordCount: 8,
    characterCount: 53,
    position: 25,
    insertedText: " Evidence grows over time.",
    previousHash: "sample-event-hash-5",
    eventHash: "sample-event-hash-6",
  },
];

export const SAMPLE_AUTHORSHIP_REPORT: AuthorshipReport = createAuthorshipReport(
  SAMPLE_WRITING_EVENTS,
  true,
);
