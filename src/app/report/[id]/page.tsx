import { AppShell } from "@/components/layout/app-shell";

type ReportPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Report</h1>
        <p className="text-muted-foreground">
          Writing report for document {id}.
        </p>
      </div>
    </AppShell>
  );
}
