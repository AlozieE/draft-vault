import type { WritingEvent } from "@/types/writing-event";

type WritingTimelineProps = {
  events: WritingEvent[];
};

export function WritingTimeline({ events }: WritingTimelineProps) {
  return (
    <aside className="w-64 border-l border-border p-4">
      <h2 className="mb-4 text-sm font-medium">Timeline</h2>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {events.length === 0 ? (
          <li>No events yet</li>
        ) : (
          events.map((event) => (
            <li key={event.id}>{event.type}</li>
          ))
        )}
      </ul>
    </aside>
  );
}
