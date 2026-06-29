"use client";

import { useCallback } from "react";

import { WritingEditor } from "@/components/editor/writing-editor";
import { WritingTimeline } from "@/components/editor/writing-timeline";
import {
  getAutosaveStatusLabel,
  useDocumentAutosave,
} from "@/hooks/use-document-autosave";
import { usePersistedWritingEvents } from "@/hooks/use-persisted-writing-events";
import type { WritingEventInput } from "@/types/writing-event";

type DocumentEditorWorkspaceProps = {
  documentId: string;
  initialContent?: string;
};

export function DocumentEditorWorkspace({
  documentId,
  initialContent,
}: DocumentEditorWorkspaceProps) {
  const { autosaveStatus, handleContentChange } =
    useDocumentAutosave(documentId);
  const { events, addWritingEvents, clearEvents, chainIsValid, isLoading } =
    usePersistedWritingEvents(documentId);

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
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        {getAutosaveStatusLabel(autosaveStatus)}
      </p>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <WritingEditor
          documentId={documentId}
          initialContent={initialContent}
          onWritingEvents={handleWritingEvents}
          onContentChange={handleContentChange}
        />
        <WritingTimeline
          events={events}
          chainIsValid={chainIsValid}
          isLoading={isLoading}
          onClear={handleClearTimeline}
        />
      </div>
    </div>
  );
}
