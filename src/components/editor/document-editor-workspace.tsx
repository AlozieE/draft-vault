"use client";

import { useCallback, useRef } from "react";

import { updateDocumentContent } from "@/actions/document-actions";
import { WritingEditor } from "@/components/editor/writing-editor";
import { WritingTimeline } from "@/components/editor/writing-timeline";
import { usePersistedWritingEvents } from "@/hooks/use-persisted-writing-events";
import type { Document } from "@/types/document";
import type { WritingEventInput } from "@/types/writing-event";

type DocumentEditorWorkspaceProps = {
  document: Document;
};

export function DocumentEditorWorkspace({
  document,
}: DocumentEditorWorkspaceProps) {
  const saveTimeoutRef = useRef<number | null>(null);
  const { events, addWritingEvent, clearEvents, chainIsValid, isLoading } =
    usePersistedWritingEvents(document.id);

  const handleWritingEvent = useCallback(
    (input: WritingEventInput) => {
      addWritingEvent({
        ...input,
        documentId: document.id,
      });
    },
    [addWritingEvent, document.id],
  );

  const handleClearTimeline = useCallback(() => {
    clearEvents();
  }, [clearEvents]);

  const handleContentChange = useCallback(
    (content: string) => {
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = window.setTimeout(() => {
        void updateDocumentContent(document.id, content);
      }, 500);
    },
    [document.id],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <WritingEditor
        documentId={document.id}
        initialContent={document.content}
        onWritingEvent={handleWritingEvent}
        onContentChange={handleContentChange}
      />
      <WritingTimeline
        events={events}
        chainIsValid={chainIsValid}
        isLoading={isLoading}
        onClear={handleClearTimeline}
      />
    </div>
  );
}
