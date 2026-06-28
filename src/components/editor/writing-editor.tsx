"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRef } from "react";

import { EditorToolbar } from "@/components/editor/editor-toolbar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { WritingEventInput, WritingEventType } from "@/types/writing-event";

const defaultContent = "<p>Start writing your draft here...</p>";

const editorContentClass = cn(
  "min-h-[500px] w-full bg-background px-8 py-6 text-base leading-relaxed outline-none",
  "[&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold",
  "[&_p]:mb-3",
  "[&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6",
);

type WritingEditorProps = {
  documentId: string;
  initialContent?: string;
  onWritingEvent?: (input: WritingEventInput) => void;
  onContentChange?: (content: string) => void;
};

function countWords(text: string): number {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return 0;
  }

  return trimmed.split(/\s+/).length;
}

function resolveEventType(contentLengthChange: number): WritingEventType {
  if (contentLengthChange > 1) {
    return "insert";
  }

  if (contentLengthChange < 0) {
    return "delete";
  }

  return "insert";
}

export function WritingEditor({
  documentId,
  initialContent = defaultContent,
  onWritingEvent,
  onContentChange,
}: WritingEditorProps) {
  const previousLengthRef = useRef<number | null>(null);
  const onWritingEventRef = useRef(onWritingEvent);
  const onContentChangeRef = useRef(onContentChange);

  onWritingEventRef.current = onWritingEvent;
  onContentChangeRef.current = onContentChange;

  const handleUpdate = (editor: Editor) => {
    const text = editor.getText();
    const characterCount = text.length;
    const previousLength = previousLengthRef.current ?? characterCount;
    const contentLengthChange = characterCount - previousLength;

    previousLengthRef.current = characterCount;

    onContentChangeRef.current?.(editor.getHTML());

    onWritingEventRef.current?.({
      documentId,
      type: resolveEventType(contentLengthChange),
      contentLengthChange,
      wordCount: countWords(text),
      characterCount,
      textPreview: text.slice(-80) || undefined,
    });
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent || defaultContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: editorContentClass,
      },
    },
    onCreate: ({ editor: createdEditor }) => {
      previousLengthRef.current = createdEditor.getText().length;
    },
    onUpdate: ({ editor: updatedEditor }) => {
      handleUpdate(updatedEditor);
    },
  });

  return (
    <Card className="overflow-hidden">
      <EditorToolbar editor={editor} />
      <CardContent className="p-0">
        <div className="mx-auto max-w-3xl">
          <EditorContent editor={editor} />
        </div>
      </CardContent>
    </Card>
  );
}
