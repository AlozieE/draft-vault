import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReportExportActions } from "@/components/report/export-report-button";
import { ReportPrintFooter } from "@/components/report/report-print-footer";
import { ReportPrintHeader } from "@/components/report/report-print-header";
import {
  formatReportGeneratedAt,
  getVerificationStatusLabel,
} from "@/lib/report-export";
import type { AuthorshipReport as AuthorshipReportData } from "@/lib/report-metrics";

type AuthorshipReportProps = {
  report: AuthorshipReportData;
  documentTitle: string;
};

type ReportMetricItem = {
  label: string;
  value: string;
};

function shortenHash(eventHash: string): string {
  if (eventHash === "—" || eventHash.length <= 16) {
    return eventHash;
  }

  return eventHash.slice(0, 16);
}

function PrintMetricGrid({ items }: { items: readonly ReportMetricItem[] }) {
  return (
    <div className="report-print-metric-grid hidden print:grid">
      {items.map((item) => (
        <div key={item.label} className="report-print-metric-cell">
          <p className="report-print-metric-label">{item.label}</p>
          <p className="report-print-metric-value">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function PrintMetricTable({
  title,
  items,
}: {
  title: string;
  items: readonly ReportMetricItem[];
}) {
  return (
    <section className="report-print-section hidden print:block">
      <h2 className="report-print-section-title">{title}</h2>
      <table className="report-print-table">
        <tbody>
          {items.map((item) => (
            <tr key={item.label}>
              <th scope="row">{item.label}</th>
              <td
                className={
                  item.label === "Final event hash" ? "font-mono" : undefined
                }
              >
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function AuthorshipReport({
  report,
  documentTitle,
}: AuthorshipReportProps) {
  const generatedAtLabel = formatReportGeneratedAt();
  const verificationLabel = getVerificationStatusLabel(report.chainIsValid);

  const summaryItems = [
    { label: "Writing duration", value: report.writingDuration },
    { label: "Total events", value: String(report.totalEvents) },
    { label: "Final word count", value: String(report.finalWordCount) },
    {
      label: "Final character count",
      value: String(report.finalCharacterCount),
    },
  ] as const;

  const breakdownItems = [
    { label: "Insert events", value: String(report.insertEvents) },
    { label: "Delete events", value: String(report.deleteEvents) },
    { label: "Paste events", value: String(report.pasteEvents) },
    { label: "Snapshot events", value: String(report.snapshotEvents) },
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
    <div className="print-report print-full-width min-w-0">
      <ReportPrintHeader
        documentTitle={documentTitle}
        generatedAtLabel={generatedAtLabel}
        chainIsValid={report.chainIsValid}
      />

      <Card className="print:border-0 print:bg-transparent print:shadow-none">
        <CardHeader className="print:hidden">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <CardTitle>Authorship Report</CardTitle>
              <CardDescription>
                Verified drafting history summary
              </CardDescription>
              <p className="mt-2 break-words text-sm font-medium">
                {documentTitle}
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col items-stretch gap-2 sm:w-auto sm:items-end">
              <Badge
                variant={report.chainIsValid ? "secondary" : "destructive"}
                className="w-fit"
              >
                {verificationLabel}
              </Badge>
              <ReportExportActions />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 print:space-y-6 print:px-0 print:pt-0">
          <section className="print:break-inside-avoid">
            <h2 className="mb-4 text-sm font-medium print:hidden">Summary</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 print:hidden">
              {summaryItems.map((item) => (
                <Card key={item.label} size="sm">
                  <CardHeader>
                    <CardDescription>{item.label}</CardDescription>
                    <CardTitle>{item.value}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <PrintMetricGrid items={summaryItems} />
          </section>

          <section className="space-y-4 print:hidden print:break-inside-avoid">
            <h2 className="text-sm font-medium">Event breakdown</h2>
            <div className="rounded-lg border border-border">
              {breakdownItems.map((item, index) => (
                <div key={item.label}>
                  <div className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                  {index < breakdownItems.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </section>

          <PrintMetricTable title="Event breakdown" items={breakdownItems} />

          <section className="space-y-4 print:hidden print:break-inside-avoid">
            <h2 className="text-sm font-medium">Integrity</h2>
            <div className="rounded-lg border border-border">
              {integrityItems.map((item, index) => (
                <div key={item.label}>
                  <div className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <span className="shrink-0 text-muted-foreground">
                      {item.label}
                    </span>
                    <span
                      className={
                        item.label === "Final event hash"
                          ? "break-all font-mono font-medium"
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
            <p className="text-xs text-muted-foreground">
              This report provides evidence of the writing process, not absolute
              proof of authorship.
            </p>
          </section>

          <PrintMetricTable title="Integrity" items={integrityItems} />
        </CardContent>
      </Card>

      <ReportPrintFooter />
    </div>
  );
}
