import { AppShell } from "@/components/layout/app-shell";
import { DocumentEditorSkeleton } from "@/components/documents/document-editor-skeleton";

export default function DocumentLoading() {
  return (
    <AppShell>
      <DocumentEditorSkeleton />
    </AppShell>
  );
}
