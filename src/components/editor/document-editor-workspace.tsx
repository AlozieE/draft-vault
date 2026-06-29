"use client";

import { useCallback } from "react";

import { WritingEditor } from "@/components/editor/writing-editor";
import { WritingTimeline } from "@/components/editor/writing-timeline";
import {
  getAutosaveStatusLabel,
  useDocumentAutosave,
} from "@/hooks/use-document-autosave";
import { usePersistedWritingEvents } from "@/hooks/use-persisted-writing-events";
import type { WritingEvent, WritingEventInput } from "@/types/writing-event";

type DocumentEditorWorkspaceProps = {
  documentId: string;
  initialContent?: string;
  initialEvents?: WritingEvent[];
};

export function DocumentEditorWorkspace({
  documentId,
  initialContent,
  initialEvents,
}: DocumentEditorWorkspaceProps) {
  const { autosaveStatus, handleContentChange } =
    useDocumentAutosave(documentId);
  const { events, addWritingEvents, clearEvents, chainIsValid, isLoading } =
    usePersistedWritingEvents(documentId, { initialEvents });

  const handleWritingEvents = useCallback(
    (inputs: WritingEventInput[]) => {
      addWritingEvents(
        inputs.map((input) => ({
          ...input,
          documentId,
        })),
      );
    },
    [addWritingEvents, documentId],
  );

  const handleClearTimeline = useCallback(() => {
    clearEvents();
  }, [clearEvents]);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <p className="shrink-0 text-sm text-muted-foreground">
        {getAutosaveStatusLabel(autosaveStatus)}
      </p>
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(18rem,1fr)_minmax(12rem,20rem)] gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:grid-rows-1">
        <div className="flex min-h-0 flex-col">
          <WritingEditor
            documentId={documentId}
            initialContent={initialContent}
            onWritingEvents={handleWritingEvents}
            onContentChange={handleContentChange}
          />
        </div>
        <div className="flex min-h-0 flex-col">
          <WritingTimeline
            events={events}
            chainIsValid={chainIsValid}
            isLoading={isLoading}
            onClear={handleClearTimeline}
          />
        </div>
      </div>
    </div>
  );
}
