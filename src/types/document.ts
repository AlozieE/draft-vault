export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type DocumentListItem = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  eventCount: number;
};

export type DocumentEditorData = Pick<Document, "id" | "title" | "content">;
