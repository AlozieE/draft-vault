import Link from "next/link";

import type { Document } from "@/types/document";

type DocumentCardProps = {
  document: Document;
};

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <Link
      href={`/documents/${document.id}`}
      className="block rounded-lg border border-border p-4 transition-colors hover:bg-muted"
    >
      <h3 className="font-medium">{document.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Updated {document.updatedAt}
      </p>
    </Link>
  );
}
