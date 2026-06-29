import {
  getDocumentForEditor,
  getOrCreateDemoDocument,
} from "@/actions/document-actions";
import { getRecentWritingEvents } from "@/actions/writing-event-actions";
import { EditableDocumentTitle } from "@/components/documents/editable-document-title";
import { ShareLinkButton } from "@/components/documents/share-link-button";
import { DocumentEditorWorkspace } from "@/components/editor/document-editor-workspace";
import { AppShell } from "@/components/layout/app-shell";

type DocumentPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { id } = await params;
  const document =
    id === "demo" ? await getOrCreateDemoDocument() : await getDocumentForEditor(id);
  const initialEvents = document
    ? await getRecentWritingEvents(document.id)
    : [];

  return (
    <AppShell>
      {document ? (
        <div className="flex min-w-0 flex-col gap-4 md:h-[calc(100vh-6.5rem)] md:min-h-0 md:gap-6">
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <EditableDocumentTitle
                documentId={document.id}
                initialTitle={document.title}
              />
            </div>
            <ShareLinkButton documentId={document.id} />
          </div>
          <DocumentEditorWorkspace
            documentId={document.id}
            initialContent={document.content}
            initialEvents={initialEvents}
            isDemoDocument={id === "demo"}
          />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center py-24">
          <h1 className="text-2xl font-semibold">Document not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            No document exists for &ldquo;{id}&rdquo;.
          </p>
        </div>
      )}
    </AppShell>
  );
}
