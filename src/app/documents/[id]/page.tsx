import { AppShell } from "@/components/layout/app-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type DocumentPageProps = {
  params: Promise<{ id: string }>;
};

const timelineEvents = [
  { time: "2:04 PM", event: "Session started" },
  { time: "2:18 PM", event: "Paragraph added — introduction" },
  { time: "2:41 PM", event: "Text revised — conclusion section" },
] as const;

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="min-h-[480px]">
          <CardHeader>
            <CardTitle>Document Editor</CardTitle>
            <CardDescription>
              Editing document: {id.replace(/-/g, " ")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-80 rounded-lg border border-dashed border-border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                Editor placeholder — writing capture will appear here.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Writing Timeline</CardTitle>
            <CardDescription>Recent events for this session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {timelineEvents.map((item, index) => (
              <div key={item.event}>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm">{item.event}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
                {index < timelineEvents.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
