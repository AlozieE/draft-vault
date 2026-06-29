"use server";

import { mapDashboardDocument, mapDocument } from "@/lib/db-mappers";
import {
  findOwnedDocument,
  getCurrentUserId,
} from "@/lib/document-ownership";
import { prisma } from "@/lib/prisma";
import type {
  Document,
  DocumentEditorData,
  DocumentListItem,
} from "@/types/document";

const DEMO_DOCUMENT_TITLE = "Demo Document";

export async function getOrCreateDemoDocument(): Promise<Document> {
  const ownerId = await getCurrentUserId();

  const existingDocument = await prisma.document.findFirst({
    where: { title: DEMO_DOCUMENT_TITLE, ownerId },
  });

  if (existingDocument) {
    return mapDocument(existingDocument);
  }

  const createdDocument = await prisma.document.create({
    data: {
      title: DEMO_DOCUMENT_TITLE,
      content: "<p>Start writing your draft here...</p>",
      ownerId,
    },
  });

  return mapDocument(createdDocument);
}

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
  const ownerId = await getCurrentUserId();

  const document = await prisma.document.create({
    data: {
      title,
      content: "",
      ownerId,
    },
  });

  return mapDocument(document);
}

export async function deleteDocument(documentId: string): Promise<void> {
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
  const document = await findOwnedDocument(documentId);

  if (!document) {
    throw new Error("Document not found");
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
  const document = await findOwnedDocument(documentId);

  if (!document) {
    throw new Error("Document not found");
  }

  const normalizedTitle = title.trim() || "Untitled Document";

  const updatedDocument = await prisma.document.update({
    where: { id: documentId },
    data: { title: normalizedTitle },
  });

  return mapDocument(updatedDocument);
}
