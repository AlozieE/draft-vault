import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ReplayPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReplayPage({ params }: ReplayPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Replay Player</CardTitle>
            <CardDescription>
              Stepping through the writing session for {id}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
              <p className="text-sm text-muted-foreground">
                Document state at event 12 of 48
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button size="sm">Play</Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              2:18 PM — Paragraph added
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
