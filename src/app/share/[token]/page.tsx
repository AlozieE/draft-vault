import { getWritingEvents } from "@/actions/writing-event-actions";
import { getShareLinkByToken } from "@/actions/share-link-actions";
import { AuthorshipReport } from "@/components/report/authorship-report";
import { ReplayPlayer } from "@/components/replay/replay-player";
import { verifyEventChain } from "@/lib/hash-chain";
import { createAuthorshipReport } from "@/lib/report-metrics";

type SharePageProps = {
  params: Promise<{ token: string }>;
};

export const dynamic = "force-dynamic";

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params;
  const shareLink = await getShareLinkByToken(token);

  if (!shareLink) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <h1 className="text-2xl font-semibold">Share link not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This link may be invalid or expired.
        </p>
      </div>
    );
  }

  const events = await getWritingEvents(shareLink.document.id);
  const chainIsValid = await verifyEventChain(events);
  const report = createAuthorshipReport(events, chainIsValid);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4">
        <p className="text-sm text-muted-foreground">Draft Vault</p>
        <h1 className="mt-1 text-2xl font-semibold">{shareLink.document.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Read-only authorship evidence
        </p>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        {events.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No writing events found for this document.
            </p>
          </div>
        ) : (
          <>
            <AuthorshipReport report={report} />
            <ReplayPlayer events={events} />
          </>
        )}

        <p className="text-sm text-muted-foreground">
          This report provides evidence of the writing process, not absolute
          proof of authorship.
        </p>
      </main>
    </div>
  );
}
