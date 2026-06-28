import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ReportPageProps = {
  params: Promise<{ id: string }>;
};

const stats = [
  { label: "Writing time", value: "2h 14m" },
  { label: "Paste events", value: "2" },
  { label: "Revisions", value: "18" },
  { label: "Verification", value: "Passed" },
] as const;

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle>Authorship Report</CardTitle>
              <Badge variant="secondary">Verified</Badge>
            </div>
            <CardDescription>
              Summary for document {id.replace(/-/g, " ")}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.map((stat, index) => (
              <div key={stat.label}>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                  <span className="text-sm font-medium">{stat.value}</span>
                </div>
                {index < stats.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
