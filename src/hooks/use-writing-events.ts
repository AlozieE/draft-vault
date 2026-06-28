"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { GENESIS_HASH } from "@/lib/constants";
import { verifyEventChain } from "@/lib/hash-chain";
import { createWritingEvent } from "@/lib/writing-event-factory";
import type { WritingEvent, WritingEventInput } from "@/types/writing-event";

export function useWritingEvents() {
  const [events, setEvents] = useState<WritingEvent[]>([]);
  const [chainIsValid, setChainIsValid] = useState(true);
  const eventsRef = useRef<WritingEvent[]>([]);
  const chainQueueRef = useRef(Promise.resolve());

  useEffect(() => {
    eventsRef.current = events;
  }, [events]);

  const addWritingEvent = useCallback((input: WritingEventInput) => {
    chainQueueRef.current = chainQueueRef.current
      .then(async () => {
        const latestEvent = eventsRef.current.at(-1);
        const previousHash = latestEvent?.eventHash ?? GENESIS_HASH;
        const event = await createWritingEvent({ ...input, previousHash });
        const nextEvents = [...eventsRef.current, event];
        const isValid = await verifyEventChain(nextEvents);

        eventsRef.current = nextEvents;
        setEvents(nextEvents);
        setChainIsValid(isValid);
      })
      .catch((error: unknown) => {
        console.error("Failed to append writing event to hash chain:", error);
      });
  }, []);

  const clearEvents = useCallback(() => {
    chainQueueRef.current = chainQueueRef.current.then(async () => {
      eventsRef.current = [];
      setEvents([]);
      setChainIsValid(true);
    });
  }, []);

  const latestEvent = useMemo(
    () => (events.length > 0 ? events[events.length - 1]! : null),
    [events],
  );

  return {
    events,
    addWritingEvent,
    clearEvents,
    latestEvent,
    chainIsValid,
  };
}
