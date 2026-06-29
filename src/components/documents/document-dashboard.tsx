"use client";

import { useCallback, useState } from "react";

import { createDocument, deleteDocument } from "@/actions/document-actions";
import { DocumentCard } from "@/components/documents/document-card";
import { Button } from "@/components/ui/button";
import type { DocumentListItem } from "@/types/document";

type DocumentDashboardProps = {
  initialDocuments: DocumentListItem[];
};

function formatUpdatedAt(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

export function DocumentDashboard({
  initialDocuments,
}: DocumentDashboardProps) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingDocumentId, setDeletingDocumentId] = useState<string | null>(
    null,
  );

  async function handleCreateDocument() {
    setIsCreating(true);

    try {
      const document = await createDocument("Untitled Document");
      setDocuments((current) => [
        {
          id: document.id,
          title: document.title,
          createdAt: document.createdAt,
          updatedAt: document.updatedAt,
          eventCount: 0,
        },
        ...current,
      ]);
    } finally {
      setIsCreating(false);
    }
  }

  const handleDeleteDocument = useCallback(async (documentId: string) => {
    setDeletingDocumentId(documentId);

    try {
      await deleteDocument(documentId);
      setDocuments((current) =>
        current.filter((document) => document.id !== documentId),
      );
    } catch (error: unknown) {
      console.error("Failed to delete document:", error);
    } finally {
      setDeletingDocumentId(null);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your documents</h1>
        <Button onClick={handleCreateDocument} disabled={isCreating}>
          {isCreating ? "Creating..." : "New document"}
        </Button>
      </div>

      {documents.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No documents yet. Create your first draft.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((document) => (
            <DocumentCard
              key={document.id}
              id={document.id}
              title={document.title}
              updatedAt={formatUpdatedAt(document.updatedAt)}
              eventCount={document.eventCount}
              isDeleting={deletingDocumentId === document.id}
              onDelete={handleDeleteDocument}
            />
          ))}
        </div>
      )}
    </div>
  );
}
