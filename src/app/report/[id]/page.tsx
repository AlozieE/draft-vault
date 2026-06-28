import {
  getDocumentById,
  getOrCreateDemoDocument,
} from "@/actions/document-actions";
import { getWritingEvents } from "@/actions/writing-event-actions";
import { AuthorshipReport } from "@/components/report/authorship-report";
import { AppShell } from "@/components/layout/app-shell";
import { verifyEventChain } from "@/lib/hash-chain";
import { createAuthorshipReport } from "@/lib/report-metrics";

type ReportPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const document =
    id === "demo" ? await getOrCreateDemoDocument() : await getDocumentById(id);

  const events = document ? await getWritingEvents(document.id) : [];
  const chainIsValid = await verifyEventChain(events);
  const report = createAuthorshipReport(events, chainIsValid);

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Document Report</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review the verified drafting history for this document.
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
            <p className="text-sm text-muted-foreground">{document.title}</p>
            <AuthorshipReport report={report} />
          </div>
        )}
      </div>
    </AppShell>
  );
}
