"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  clearWritingEvents as clearWritingEventsFromDb,
  createWritingEventRecord,
  getWritingEvents,
} from "@/actions/writing-event-actions";
import { GENESIS_HASH } from "@/lib/constants";
import { verifyEventChain } from "@/lib/hash-chain";
import { createWritingEvent } from "@/lib/writing-event-factory";
import type { WritingEvent, WritingEventInput } from "@/types/writing-event";

export function usePersistedWritingEvents(documentId: string) {
  const [events, setEvents] = useState<WritingEvent[]>([]);
  const [chainIsValid, setChainIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const eventsRef = useRef<WritingEvent[]>([]);
  const chainQueueRef = useRef(Promise.resolve());

  useEffect(() => {
    eventsRef.current = events;
  }, [events]);

  useEffect(() => {
    let isCancelled = false;

    const loadEvents = async () => {
      setIsLoading(true);

      try {
        const loadedEvents = await getWritingEvents(documentId);

        if (isCancelled) {
          return;
        }

        eventsRef.current = loadedEvents;
        setEvents(loadedEvents);
        setChainIsValid(await verifyEventChain(loadedEvents));
      } catch (error: unknown) {
        console.error("Failed to load writing events:", error);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadEvents();

    return () => {
      isCancelled = true;
    };
  }, [documentId]);

  const addWritingEvent = useCallback(
    (input: WritingEventInput) => {
      chainQueueRef.current = chainQueueRef.current
        .then(async () => {
          const latestEvent = eventsRef.current.at(-1);
          const previousHash = latestEvent?.eventHash ?? GENESIS_HASH;
          const event = await createWritingEvent({
            ...input,
            documentId,
            previousHash,
          });

          const optimisticEvents = [...eventsRef.current, event];
          eventsRef.current = optimisticEvents;
          setEvents(optimisticEvents);

          try {
            const savedEvent = await createWritingEventRecord({
              id: event.id,
              documentId: event.documentId,
              type: event.type,
              timestamp: event.timestamp,
              contentLengthChange: event.contentLengthChange,
              wordCount: event.wordCount,
              characterCount: event.characterCount,
              textPreview: event.textPreview,
              previousHash: event.previousHash,
              eventHash: event.eventHash,
            });

            const nextEvents = [...eventsRef.current.slice(0, -1), savedEvent];
            eventsRef.current = nextEvents;
            setEvents(nextEvents);
            setChainIsValid(await verifyEventChain(nextEvents));
          } catch (error: unknown) {
            const revertedEvents = eventsRef.current.slice(0, -1);
            eventsRef.current = revertedEvents;
            setEvents(revertedEvents);
            setChainIsValid(await verifyEventChain(revertedEvents));
            console.error("Failed to save writing event:", error);
          }
        })
        .catch((error: unknown) => {
          console.error("Failed to append writing event:", error);
        });
    },
    [documentId],
  );

  const clearEvents = useCallback(() => {
    chainQueueRef.current = chainQueueRef.current.then(async () => {
      try {
        await clearWritingEventsFromDb(documentId);
        eventsRef.current = [];
        setEvents([]);
        setChainIsValid(true);
      } catch (error: unknown) {
        console.error("Failed to clear writing events:", error);
      }
    });
  }, [documentId]);

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
    isLoading,
  };
}
