"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { replayEvents } from "@/lib/replay-engine";
import type { WritingEvent } from "@/types/writing-event";

const PLAYBACK_INTERVAL_MS = 800;

type ReplayPlayerProps = {
  events: WritingEvent[];
};

export function ReplayPlayer({ events }: ReplayPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [replayText, setReplayText] = useState("");

  const isAtStart = currentIndex < 0;
  const isAtEnd = events.length > 0 && currentIndex >= events.length - 1;

  useEffect(() => {
    setReplayText(replayEvents(events, currentIndex));
  }, [events, currentIndex]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    if (isAtEnd) {
      setIsPlaying(false);
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((previousIndex) => {
        if (previousIndex >= events.length - 1) {
          setIsPlaying(false);
          return previousIndex;
        }

        return previousIndex + 1;
      });
    }, PLAYBACK_INTERVAL_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPlaying, isAtEnd, events.length]);

  const handlePlay = useCallback(() => {
    if (events.length === 0) {
      return;
    }

    if (isAtEnd) {
      setCurrentIndex(-1);
    }

    setIsPlaying(true);
  }, [events.length, isAtEnd]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(-1);
  }, []);

  const handleStepBackward = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex((previousIndex) => Math.max(-1, previousIndex - 1));
  }, []);

  const handleStepForward = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex((previousIndex) =>
      Math.min(events.length - 1, previousIndex + 1),
    );
  }, [events.length]);

  const eventLabel =
    events.length === 0
      ? "Event 0 of 0"
      : `Event ${Math.max(0, currentIndex + 1)} of ${events.length}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Replay Player</CardTitle>
        <CardDescription>{eventLabel}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="min-h-48 rounded-lg border border-border bg-muted/30 p-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {replayText || "Document replay will appear here."}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleStepBackward}
            disabled={events.length === 0 || isAtStart}
          >
            Step backward
          </Button>
          <Button
            size="sm"
            onClick={handlePlay}
            disabled={events.length === 0 || (isPlaying && !isAtEnd)}
          >
            Play
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePause}
            disabled={!isPlaying}
          >
            Pause
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleStepForward}
            disabled={events.length === 0 || isAtEnd}
          >
            Step forward
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={events.length === 0 || (isAtStart && !isPlaying)}
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
