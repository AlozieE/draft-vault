export type WritingEventType = "insert" | "delete" | "paste" | "snapshot";

export interface WritingEvent {
  id: string;
  documentId: string;
  type: WritingEventType;
  timestamp: string;
  contentLengthChange: number;
  wordCount: number;
  characterCount: number;
  textPreview?: string;
}
