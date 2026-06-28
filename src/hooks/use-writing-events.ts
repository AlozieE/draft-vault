"use client";

import { useMemo, useState } from "react";

import type { WritingEvent } from "@/types/writing-event";

export function useWritingEvents() {
  const [events, setEvents] = useState<WritingEvent[]>([]);

  const addEvent = (event: WritingEvent) => {
    setEvents((current) => [...current, event]);
  };

  const clearEvents = () => {
    setEvents([]);
  };

  const latestEvent = useMemo(
    () => (events.length > 0 ? events[events.length - 1]! : null),
    [events],
  );

  return {
    events,
    addEvent,
    clearEvents,
    latestEvent,
  };
}
