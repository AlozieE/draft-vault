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

async function persistWritingEventRecord(event: WritingEvent): Promise<WritingEvent> {
  return createWritingEventRecord({
    id: event.id,
    documentId: event.documentId,
    type: event.type,
    timestamp: event.timestamp,
    contentLengthChange: event.contentLengthChange,
    wordCount: event.wordCount,
    characterCount: event.characterCount,
    textPreview: event.textPreview,
    position: event.position,
    insertedText: event.insertedText,
    deletedText: event.deletedText,
    fullTextSnapshot: event.fullTextSnapshot,
    previousHash: event.previousHash,
    eventHash: event.eventHash,
  });
}

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

  const addWritingEvents = useCallback(
    (inputs: WritingEventInput[]) => {
      if (inputs.length === 0) {
        return;
      }

      chainQueueRef.current = chainQueueRef.current
        .then(async () => {
          let workingEvents = [...eventsRef.current];

          for (const input of inputs) {
            const previousHash =
              workingEvents.at(-1)?.eventHash ?? GENESIS_HASH;
            const event = await createWritingEvent({
              ...input,
              documentId,
              previousHash,
            });

            workingEvents = [...workingEvents, event];
            eventsRef.current = workingEvents;
            setEvents(workingEvents);

            try {
              const savedEvent = await persistWritingEventRecord(event);
              workingEvents = [...workingEvents.slice(0, -1), savedEvent];
              eventsRef.current = workingEvents;
              setEvents(workingEvents);
            } catch (error: unknown) {
              workingEvents = workingEvents.slice(0, -1);
              eventsRef.current = workingEvents;
              setEvents(workingEvents);
              setChainIsValid(await verifyEventChain(workingEvents));
              console.error("Failed to save writing event:", error);
              return;
            }
          }

          setChainIsValid(await verifyEventChain(workingEvents));
        })
        .catch((error: unknown) => {
          console.error("Failed to append writing events:", error);
        });
    },
    [documentId],
  );

  const addWritingEvent = useCallback(
    (input: WritingEventInput) => {
      addWritingEvents([input]);
    },
    [addWritingEvents],
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
    addWritingEvents,
    clearEvents,
    latestEvent,
    chainIsValid,
    isLoading,
  };
}
