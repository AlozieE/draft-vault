import type { Document } from "@prisma/client";

import { getOrCreateCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export async function getCurrentUserId(): Promise<string> {
  const user = await getOrCreateCurrentUser();
  return user.id;
}

export async function findOwnedDocument(
  documentId: string,
): Promise<Document | null> {
  const ownerId = await getCurrentUserId();

  return prisma.document.findFirst({
    where: { id: documentId, ownerId },
  });
}

export async function assertDocumentOwnership(documentId: string): Promise<void> {
  const document = await findOwnedDocument(documentId);

  if (!document) {
    throw new Error("Document not found");
  }
}
