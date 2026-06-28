import type { WritingEvent, WritingEventType } from "@/types/writing-event";

type CreateWritingEventParams = {
  documentId: string;
  type: WritingEventType;
  contentLengthChange: number;
  wordCount: number;
  characterCount: number;
  textPreview?: string;
};

export function createWritingEvent(
  params: CreateWritingEventParams,
): WritingEvent {
  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...params,
  };
}
