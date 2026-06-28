"use client";

import { useState } from "react";

import type { WritingEvent } from "@/types/writing-event";

export function useWritingEvents(documentId: string) {
  const [events, setEvents] = useState<WritingEvent[]>([]);

  return {
    documentId,
    events,
    setEvents,
  };
}
