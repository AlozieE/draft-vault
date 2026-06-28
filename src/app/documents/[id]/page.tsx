import {
  getDocumentById,
  getOrCreateDemoDocument,
} from "@/actions/document-actions";
import { DocumentEditorWorkspace } from "@/components/editor/document-editor-workspace";
import { AppShell } from "@/components/layout/app-shell";

type DocumentPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { id } = await params;
  const document =
    id === "demo" ? await getOrCreateDemoDocument() : await getDocumentById(id);

  return (
    <AppShell>
      {document ? (
        <DocumentEditorWorkspace document={document} />
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
