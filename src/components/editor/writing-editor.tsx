"use client";

import { EditorToolbar } from "@/components/editor/editor-toolbar";
import { WritingTimeline } from "@/components/editor/writing-timeline";
import { useWritingEvents } from "@/hooks/use-writing-events";

type WritingEditorProps = {
  documentId: string;
};

export function WritingEditor({ documentId }: WritingEditorProps) {
  const { events } = useWritingEvents(documentId);

  return (
    <div className="flex h-full flex-col rounded-lg border border-border">
      <EditorToolbar />
      <div className="flex flex-1">
        <div className="flex-1 p-4">
          <textarea
            className="h-full min-h-96 w-full resize-none bg-transparent outline-none"
            placeholder="Start writing..."
            readOnly
          />
        </div>
        <WritingTimeline events={events} />
      </div>
    </div>
  );
}
