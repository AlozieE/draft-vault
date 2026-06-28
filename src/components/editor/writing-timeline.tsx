import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { WritingEvent } from "@/types/writing-event";

type WritingTimelineProps = {
  events: WritingEvent[];
};

function formatLocalTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatContentLengthChange(change: number): string {
  if (change > 0) {
    return `+${change}`;
  }

  return String(change);
}

export function WritingTimeline({ events }: WritingTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Writing Timeline</CardTitle>
        <CardDescription>Recent events for this session</CardDescription>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Start writing to record your drafting timeline.
          </p>
        ) : (
          <ul className="space-y-4">
            {events.map((event, index) => (
              <li key={event.id}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary">{event.type}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatLocalTime(event.timestamp)}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>
                      Change: {formatContentLengthChange(event.contentLengthChange)}
                    </span>
                    <span>Words: {event.wordCount}</span>
                  </div>
                </div>
                {index < events.length - 1 && <Separator className="mt-4" />}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
