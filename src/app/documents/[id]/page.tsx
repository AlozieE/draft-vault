import { DocumentEditorWorkspace } from "@/components/editor/document-editor-workspace";
import { AppShell } from "@/components/layout/app-shell";

type DocumentPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <DocumentEditorWorkspace documentId={id} />
    </AppShell>
  );
}
