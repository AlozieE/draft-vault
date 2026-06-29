import { getDocumentById } from "@/actions/document-actions";
import { getWritingEvents } from "@/actions/writing-event-actions";
import { ReplayPlayer } from "@/components/replay/replay-player";
import { AppShell } from "@/components/layout/app-shell";

type ReplayPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReplayPage({ params }: ReplayPageProps) {
  const { id } = await params;
  const document = await getDocumentById(id);

  const events = document ? await getWritingEvents(document.id) : [];

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Writing Replay</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Replay the document creation process from recorded writing events.
          </p>
        </div>

        {!document ? (
          <div className="flex flex-col items-center justify-center py-24">
            <h2 className="text-xl font-semibold">Document not found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              No document exists for &ldquo;{id}&rdquo;.
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No writing events found. Write in the editor first.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm font-medium">{document.title}</p>
            <ReplayPlayer events={events} />
          </div>
        )}
      </div>
    </AppShell>
  );
}
