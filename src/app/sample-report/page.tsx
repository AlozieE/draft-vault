import Link from "next/link";

import { AuthorshipReport } from "@/components/report/authorship-report";
import { ReplayPlayer } from "@/components/replay/replay-player";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import {
  SAMPLE_AUTHORSHIP_REPORT,
  SAMPLE_DOCUMENT_DESCRIPTION,
  SAMPLE_DOCUMENT_TITLE,
  SAMPLE_WRITING_EVENTS,
} from "@/lib/sample-report-data";

export default function SampleReportPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 print:hidden">
        <p className="text-sm text-muted-foreground">{APP_NAME}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold">Sample Authorship Report</h1>
          <Badge variant="secondary">Sample data</Badge>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {SAMPLE_DOCUMENT_DESCRIPTION}
        </p>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-6 py-8 print:max-w-none print:px-0 print:py-0">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <p className="text-sm text-muted-foreground">
            Explore how Draft Vault summarizes drafting history before creating
            your own documents.
          </p>
          <Button asChild size="sm">
            <Link href="/dashboard">Start writing</Link>
          </Button>
        </div>

        <AuthorshipReport
          report={SAMPLE_AUTHORSHIP_REPORT}
          documentTitle={SAMPLE_DOCUMENT_TITLE}
        />

        <section className="space-y-3 print:hidden">
          <div>
            <h2 className="text-lg font-semibold">Sample replay</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A short example of how recorded writing events can be replayed.
            </p>
          </div>
          <ReplayPlayer events={SAMPLE_WRITING_EVENTS} />
        </section>
      </main>
    </div>
  );
}
