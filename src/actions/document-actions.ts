"use server";

import { prisma } from "@/lib/prisma";
import { mapDocument } from "@/lib/db-mappers";
import type { Document } from "@/types/document";

const DEMO_DOCUMENT_TITLE = "Demo Document";

export async function getOrCreateDemoDocument(): Promise<Document> {
  const existingDocument = await prisma.document.findFirst({
    where: { title: DEMO_DOCUMENT_TITLE },
  });

  if (existingDocument) {
    return mapDocument(existingDocument);
  }

  const createdDocument = await prisma.document.create({
    data: {
      title: DEMO_DOCUMENT_TITLE,
      content: "<p>Start writing your draft here...</p>",
    },
  });

  return mapDocument(createdDocument);
}

export async function getDocumentById(
  documentId: string,
): Promise<Document | null> {
  const document = await prisma.document.findUnique({
    where: { id: documentId },
  });

  if (!document) {
    return null;
  }

  return mapDocument(document);
}

export async function getDocuments(): Promise<Document[]> {
  const documents = await prisma.document.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return documents.map(mapDocument);
}

export async function createDocument(title: string): Promise<Document> {
  const document = await prisma.document.create({
    data: {
      title,
      content: "",
    },
  });

  return mapDocument(document);
}

export async function deleteDocument(documentId: string): Promise<void> {
  await prisma.document.delete({
    where: { id: documentId },
  });
}

export async function updateDocumentContent(
  documentId: string,
  content: string,
): Promise<Document> {
  const document = await prisma.document.update({
    where: { id: documentId },
    data: { content },
  });

  return mapDocument(document);
}
