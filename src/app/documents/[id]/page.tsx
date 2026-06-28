import { AppShell } from "@/components/layout/app-shell";
import { WritingEditor } from "@/components/editor/writing-editor";

type DocumentPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Document {id}</h1>
        <WritingEditor documentId={id} />
      </div>
    </AppShell>
  );
}
