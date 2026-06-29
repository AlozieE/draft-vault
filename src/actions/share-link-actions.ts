"use server";

import { prisma } from "@/lib/prisma";
import {
  mapShareLink,
  mapShareLinkWithDocument,
} from "@/lib/share-link-mapper";
import type { ShareLink, ShareLinkWithDocument } from "@/types/share-link";

function generateShareToken(): string {
  return crypto.randomUUID().replace(/-/g, "");
}

export async function createShareLink(documentId: string): Promise<ShareLink> {
  const document = await prisma.document.findUnique({
    where: { id: documentId },
  });

  if (!document) {
    throw new Error("Document not found");
  }

  const shareLink = await prisma.shareLink.create({
    data: {
      documentId,
      token: generateShareToken(),
    },
  });

  return mapShareLink(shareLink);
}

export async function getShareLinkByToken(
  token: string,
): Promise<ShareLinkWithDocument | null> {
  const shareLink = await prisma.shareLink.findUnique({
    where: { token },
    include: { document: true },
  });

  if (!shareLink) {
    return null;
  }

  if (shareLink.expiresAt && shareLink.expiresAt.getTime() < Date.now()) {
    return null;
  }

  return mapShareLinkWithDocument(shareLink);
}
