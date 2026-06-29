import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { ClientFormattedTime } from "@/components/ui/client-formatted-time";
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
  chainIsValid: boolean;
  isLoading?: boolean;
  deleteEventsControl?: ReactNode;
};

function formatContentLengthChange(change: number): string {
  if (change > 0) {
    return `+${change}`;
  }

  return String(change);
}

function shortenEventHash(eventHash: string): string {
  return eventHash.slice(0, 10);
}

export function WritingTimeline({
  events,
  chainIsValid,
  isLoading = false,
  deleteEventsControl,
}: WritingTimelineProps) {
  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden pb-0 pt-(--card-spacing)">
      <CardHeader className="shrink-0 pt-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle>Writing Timeline</CardTitle>
            <CardDescription>Recent events for this session</CardDescription>
          </div>
          <Badge variant={chainIsValid ? "secondary" : "destructive"}>
            {chainIsValid ? "Verification passed" : "Verification failed"}
          </Badge>
        </div>
        {deleteEventsControl}
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto pb-(--card-spacing)">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading timeline...</p>
        ) : events.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Start writing to record your drafting timeline.
          </p>
        ) : (
          <ul className="space-y-4">
            {events.map((event, index) => (
              <li key={event.id}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline">{event.type}</Badge>
                    <ClientFormattedTime
                      timestamp={event.timestamp}
                      className="text-xs text-muted-foreground"
                    />
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>
                      Change:{" "}
                      {formatContentLengthChange(event.contentLengthChange)}
                    </span>
                    <span>Words: {event.wordCount}</span>
                    <span className="font-mono">
                      Hash: {shortenEventHash(event.eventHash)}
                    </span>
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
