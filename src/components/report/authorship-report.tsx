import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExportReportButton } from "@/components/report/export-report-button";
import { REPORT_PRINT_DISCLAIMER } from "@/lib/report-export";
import type { AuthorshipReport as AuthorshipReportData } from "@/lib/report-metrics";

type AuthorshipReportProps = {
  report: AuthorshipReportData;
  documentTitle?: string;
};

function shortenHash(eventHash: string): string {
  if (eventHash === "—" || eventHash.length <= 16) {
    return eventHash;
  }

  return eventHash.slice(0, 16);
}

export function AuthorshipReport({ report, documentTitle }: AuthorshipReportProps) {
  const summaryItems = [
    { label: "Writing duration", value: report.writingDuration },
    { label: "Total events", value: String(report.totalEvents) },
    { label: "Final word count", value: String(report.finalWordCount) },
    { label: "Final character count", value: String(report.finalCharacterCount) },
  ] as const;

  const breakdownItems = [
    { label: "Insert events", value: report.insertEvents },
    { label: "Delete events", value: report.deleteEvents },
    { label: "Paste events", value: report.pasteEvents },
    { label: "Snapshot events", value: report.snapshotEvents },
  ] as const;

  const integrityItems = [
    { label: "First event time", value: report.firstEventTime },
    { label: "Last event time", value: report.lastEventTime },
    {
      label: "Final event hash",
      value: shortenHash(report.finalEventHash),
    },
  ] as const;

  return (
    <div className="print-report print-full-width space-y-4">
      {documentTitle ? (
        <p className="hidden print:block text-xl font-semibold">{documentTitle}</p>
      ) : null}

      <Card className="print:border print:border-border print:shadow-none">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Authorship Report</CardTitle>
              <CardDescription>
                Verified drafting history summary
              </CardDescription>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Badge variant={report.chainIsValid ? "secondary" : "destructive"}>
                {report.chainIsValid
                  ? "Verification passed"
                  : "Verification failed"}
              </Badge>
              <ExportReportButton />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <section className="grid gap-4 sm:grid-cols-2">
            {summaryItems.map((item) => (
              <Card key={item.label} size="sm" className="print:break-inside-avoid">
                <CardHeader>
                  <CardDescription>{item.label}</CardDescription>
                  <CardTitle>{item.value}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </section>

          <section className="space-y-4 print:break-inside-avoid">
            <h2 className="text-sm font-medium">Event breakdown</h2>
            <div className="rounded-lg border border-border">
              {breakdownItems.map((item, index) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between px-4 py-3 text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                  {index < breakdownItems.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 print:break-inside-avoid">
            <h2 className="text-sm font-medium">Integrity</h2>
            <div className="rounded-lg border border-border">
              {integrityItems.map((item, index) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span
                      className={
                        item.label === "Final event hash"
                          ? "font-mono font-medium"
                          : "font-medium"
                      }
                    >
                      {item.value}
                    </span>
                  </div>
                  {index < integrityItems.length - 1 && <Separator />}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground print:hidden">
              This report provides evidence of the writing process, not absolute
              proof of authorship.
            </p>
          </section>
        </CardContent>
      </Card>

      <p className="hidden text-sm text-muted-foreground print:block">
        {REPORT_PRINT_DISCLAIMER}
      </p>
    </div>
  );
}
