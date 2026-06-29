import type {
  Document as PrismaDocument,
  ShareLink as PrismaShareLink,
} from "@prisma/client";

import { mapDocument } from "@/lib/db-mappers";
import type { ShareLink, ShareLinkWithDocument } from "@/types/share-link";

export function mapShareLink(record: PrismaShareLink): ShareLink {
  return {
    id: record.id,
    documentId: record.documentId,
    token: record.token,
    expiresAt: record.expiresAt?.toISOString() ?? null,
    createdAt: record.createdAt.toISOString(),
  };
}

export function mapShareLinkWithDocument(
  record: PrismaShareLink & { document: PrismaDocument },
): ShareLinkWithDocument {
  return {
    ...mapShareLink(record),
    document: mapDocument(record.document),
  };
}
