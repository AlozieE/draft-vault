import type { WritingEvent, WritingEventType } from "@/types/writing-event";

export type AuthorshipReport = {
  totalEvents: number;
  writingDuration: string;
  insertEvents: number;
  deleteEvents: number;
  pasteEvents: number;
  snapshotEvents: number;
  finalWordCount: number;
  finalCharacterCount: number;
  firstEventTime: string;
  lastEventTime: string;
  finalEventHash: string;
  chainIsValid: boolean;
};

const EMPTY_EVENT_COUNTS: Record<WritingEventType, number> = {
  insert: 0,
  delete: 0,
  paste: 0,
  snapshot: 0,
};

function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatDuration(durationMs: number): string {
  if (durationMs <= 0) {
    return "0m";
  }

  const totalMinutes = Math.floor(durationMs / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  const seconds = Math.floor(durationMs / 1_000);
  if (totalMinutes > 0) {
    return `${totalMinutes}m`;
  }

  return `${seconds}s`;
}

export function calculateWritingDuration(events: WritingEvent[]): string {
  if (events.length < 2) {
    return "0m";
  }

  const firstTime = new Date(events[0]!.timestamp).getTime();
  const lastTime = new Date(events[events.length - 1]!.timestamp).getTime();

  return formatDuration(lastTime - firstTime);
}

export function countEventsByType(
  events: WritingEvent[],
): Record<WritingEventType, number> {
  return events.reduce(
    (counts, event) => {
      counts[event.type] += 1;
      return counts;
    },
    { ...EMPTY_EVENT_COUNTS },
  );
}

export function getFinalWordCount(events: WritingEvent[]): number {
  return events.at(-1)?.wordCount ?? 0;
}

export function getFinalCharacterCount(events: WritingEvent[]): number {
  return events.at(-1)?.characterCount ?? 0;
}

export function getFirstEventTime(events: WritingEvent[]): string {
  if (events.length === 0) {
    return "—";
  }

  return formatTimestamp(events[0]!.timestamp);
}

export function getLastEventTime(events: WritingEvent[]): string {
  if (events.length === 0) {
    return "—";
  }

  return formatTimestamp(events.at(-1)!.timestamp);
}

export function getFinalEventHash(events: WritingEvent[]): string {
  return events.at(-1)?.eventHash ?? "—";
}

export function createAuthorshipReport(
  events: WritingEvent[],
  chainIsValid: boolean,
): AuthorshipReport {
  const eventCounts = countEventsByType(events);

  return {
    totalEvents: events.length,
    writingDuration: calculateWritingDuration(events),
    insertEvents: eventCounts.insert,
    deleteEvents: eventCounts.delete,
    pasteEvents: eventCounts.paste,
    snapshotEvents: eventCounts.snapshot,
    finalWordCount: getFinalWordCount(events),
    finalCharacterCount: getFinalCharacterCount(events),
    firstEventTime: getFirstEventTime(events),
    lastEventTime: getLastEventTime(events),
    finalEventHash: getFinalEventHash(events),
    chainIsValid,
  };
}
