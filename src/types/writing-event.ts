export type WritingEventType = "insert" | "delete" | "replace";

export interface WritingEvent {
  id: string;
  documentId: string;
  type: WritingEventType;
  timestamp: number;
  content?: string;
  previousHash: string;
  hash: string;
}
