import { AppShell } from "@/components/layout/app-shell";

type ReplayPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReplayPage({ params }: ReplayPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Replay</h1>
        <p className="text-muted-foreground">
          Replay session for document {id}.
        </p>
      </div>
    </AppShell>
  );
}
