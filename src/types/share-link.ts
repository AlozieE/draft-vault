import type { Document } from "@/types/document";

export interface ShareLink {
  id: string;
  documentId: string;
  token: string;
  expiresAt: string | null;
  createdAt: string;
}

export type ShareLinkWithDocument = ShareLink & {
  document: Document;
};
