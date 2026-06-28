export type WritingEventType = "insert" | "delete" | "paste" | "snapshot";

export type WritingEventInput = {
  documentId: string;
  type: WritingEventType;
  contentLengthChange: number;
  wordCount: number;
  characterCount: number;
  textPreview?: string;
};

export interface WritingEvent extends WritingEventInput {
  id: string;
  timestamp: string;
  previousHash: string;
  eventHash: string;
}
