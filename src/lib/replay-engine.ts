import type { WritingEvent } from "@/types/writing-event";

export function applyWritingEvent(
  currentText: string,
  event: WritingEvent,
): string {
  switch (event.type) {
    case "insert":
    case "paste": {
      if (event.insertedText == null || event.position == null) {
        return currentText;
      }

      return (
        currentText.slice(0, event.position) +
        event.insertedText +
        currentText.slice(event.position)
      );
    }
    case "delete": {
      if (event.deletedText == null || event.position == null) {
        return currentText;
      }

      return (
        currentText.slice(0, event.position) +
        currentText.slice(event.position + event.deletedText.length)
      );
    }
    case "snapshot":
      return event.fullTextSnapshot ?? currentText;
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
