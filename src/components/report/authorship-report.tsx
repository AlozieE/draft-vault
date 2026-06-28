import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { AuthorshipReport as AuthorshipReportData } from "@/lib/report-metrics";

type AuthorshipReportProps = {
  report: AuthorshipReportData;
};

function shortenHash(eventHash: string): string {
  if (eventHash === "—" || eventHash.length <= 16) {
    return eventHash;
  }

  return eventHash.slice(0, 16);
}

export function AuthorshipReport({ report }: AuthorshipReportProps) {
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
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Authorship Report</CardTitle>
            <CardDescription>
              Verified drafting history summary
            </CardDescription>
          </div>
          <Badge variant={report.chainIsValid ? "secondary" : "destructive"}>
            {report.chainIsValid
              ? "Verification passed"
              : "Verification failed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <section className="grid gap-4 sm:grid-cols-2">
          {summaryItems.map((item) => (
            <Card key={item.label} size="sm">
              <CardHeader>
                <CardDescription>{item.label}</CardDescription>
                <CardTitle>{item.value}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="space-y-4">
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

        <section className="space-y-4">
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
          <p className="text-xs text-muted-foreground">
            This report provides evidence of the writing process, not absolute
            proof of authorship.
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
