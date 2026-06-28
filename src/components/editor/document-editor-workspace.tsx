"use client";

import { WritingEditor } from "@/components/editor/writing-editor";
import { WritingTimeline } from "@/components/editor/writing-timeline";
import { useWritingEvents } from "@/hooks/use-writing-events";

type DocumentEditorWorkspaceProps = {
  documentId: string;
};

export function DocumentEditorWorkspace({
  documentId,
}: DocumentEditorWorkspaceProps) {
  const resolvedDocumentId = documentId || "demo";
  const { events, addEvent } = useWritingEvents();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Document Editor</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Editing document: {resolvedDocumentId.replace(/-/g, " ")}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <WritingEditor
          documentId={resolvedDocumentId}
          onWritingEvent={addEvent}
        />
        <WritingTimeline events={events} />
      </div>
    </div>
  );
}
