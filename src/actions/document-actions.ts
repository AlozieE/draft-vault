"use server";

import { mapDashboardDocument, mapDocument } from "@/lib/db-mappers";
import {
  findOwnedDocument,
  getCurrentUserId,
} from "@/lib/document-ownership";
import {
  rateLimitByUser,
  rateLimitByUserAndDocument,
} from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";
import type {
  Document,
  DocumentEditorData,
  DocumentListItem,
} from "@/types/document";

const TITLE_MAX_LENGTH = 255;
const CONTENT_MAX_BYTES = 500 * 1024;


export async function getDocumentById(
  documentId: string,
): Promise<Document | null> {
  const document = await findOwnedDocument(documentId);

  if (!document) {
    return null;
  }

  return mapDocument(document);
}

export async function getDocumentForEditor(
  documentId: string,
): Promise<DocumentEditorData | null> {
  const document = await findOwnedDocument(documentId);

  if (!document) {
    return null;
  }

  return {
    id: document.id,
    title: document.title,
    content: document.content,
  };
}

export async function getDocuments(): Promise<DocumentListItem[]> {
  await rateLimitByUser();
  const ownerId = await getCurrentUserId();

  const documents = await prisma.document.findMany({
    where: { ownerId },
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: { writingEvents: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return documents.map(mapDashboardDocument);
}

export async function createDocument(title: string): Promise<Document> {
  await rateLimitByUser();
  const ownerId = await getCurrentUserId();

  const normalizedTitle = title.trim() || "Untitled Document";
  if (normalizedTitle.length > TITLE_MAX_LENGTH) {
    throw new Error("Title must be 255 characters or fewer");
  }

  const document = await prisma.document.create({
    data: {
      title: normalizedTitle,
      content: "",
      ownerId,
    },
  });

  return mapDocument(document);
}

export async function deleteDocument(documentId: string): Promise<void> {
  await rateLimitByUser();
  const document = await findOwnedDocument(documentId);

  if (!document) {
    throw new Error("Document not found");
  }

  await prisma.document.delete({
    where: { id: documentId },
  });
}

export async function updateDocumentContent(
  documentId: string,
  content: string,
): Promise<Document> {
  await rateLimitByUserAndDocument(documentId);
  const document = await findOwnedDocument(documentId);

  if (!document) {
    throw new Error("Document not found");
  }

  if (new TextEncoder().encode(content).length > CONTENT_MAX_BYTES) {
    throw new Error("Document content exceeds maximum size of 500 KB");
  }

  const updatedDocument = await prisma.document.update({
    where: { id: documentId },
    data: { content },
  });

  return mapDocument(updatedDocument);
}

export async function updateDocumentTitle(
  documentId: string,
  title: string,
): Promise<Document> {
  await rateLimitByUserAndDocument(documentId);
  const document = await findOwnedDocument(documentId);

  if (!document) {
    throw new Error("Document not found");
  }

  const normalizedTitle = title.trim() || "Untitled Document";
  if (normalizedTitle.length > TITLE_MAX_LENGTH) {
    throw new Error("Title must be 255 characters or fewer");
  }

  const updatedDocument = await prisma.document.update({
    where: { id: documentId },
    data: { title: normalizedTitle },
  });

  return mapDocument(updatedDocument);
}
