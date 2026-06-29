"use client";

import { useCallback } from "react";

import { DeleteEventsDialog } from "@/components/editor/delete-events-dialog";
import { WritingEditor } from "@/components/editor/writing-editor";
import { WritingTimeline } from "@/components/editor/writing-timeline";
import {
  getAutosaveStatusLabel,
  useDocumentAutosave,
} from "@/hooks/use-document-autosave";
import { usePersistedWritingEvents } from "@/hooks/use-persisted-writing-events";
import {
  DELETE_WRITING_EVENTS_DESCRIPTION,
  RECORDED_EVENTS_DELETE_LABEL,
} from "@/lib/audit-log";
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

  const handleDeleteEvents = useCallback(
    async (targetDocumentId: string) => {
      if (targetDocumentId !== documentId) {
        return;
      }

      await clearEvents();
    },
    [clearEvents, documentId],
  );

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
            deleteEventsControl={
              <DeleteEventsDialog
                documentId={documentId}
                label={RECORDED_EVENTS_DELETE_LABEL}
                description={DELETE_WRITING_EVENTS_DESCRIPTION}
                onConfirm={handleDeleteEvents}
                disabled={isLoading || events.length === 0}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
