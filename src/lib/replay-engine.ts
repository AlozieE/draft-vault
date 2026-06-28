import type { WritingEvent } from "@/types/writing-event";

export function applyWritingEvent(
  currentText: string,
  event: WritingEvent,
): string {
  switch (event.type) {
    case "insert":
    case "paste":
      return currentText + (event.textPreview ?? "");
    case "delete":
      return currentText.slice(
        0,
        currentText.length - Math.abs(event.contentLengthChange),
      );
    case "snapshot":
      return currentText;
    default:
      return currentText;
  }
}

export function replayEvents(
  events: WritingEvent[],
  currentIndex: number,
): string {
  if (events.length === 0 || currentIndex < 0) {
    return "";
  }

  const lastIndex = Math.min(currentIndex, events.length - 1);
  let text = "";

  for (let index = 0; index <= lastIndex; index++) {
    text = applyWritingEvent(text, events[index]!);
  }

  return text;
}
