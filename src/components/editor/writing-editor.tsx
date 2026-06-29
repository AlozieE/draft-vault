"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRef } from "react";

import { EditorToolbar } from "@/components/editor/editor-toolbar";
import { Card, CardContent } from "@/components/ui/card";
import {
  computeTextChanges,
  createTextPreview,
} from "@/lib/text-change";
import { cn } from "@/lib/utils";
import type { WritingEventInput, WritingEventType } from "@/types/writing-event";

const defaultContent = "<p>Start writing your draft here...</p>";

const editorContentClass = cn(
  "min-h-[12rem] w-full bg-background px-8 py-6 text-base leading-relaxed outline-none",
  "[&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold",
  "[&_p]:mb-3",
  "[&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6",
);

type WritingEditorProps = {
  documentId: string;
  initialContent?: string;
  onWritingEvents?: (inputs: WritingEventInput[]) => void;
  onContentChange?: (content: string) => void;
};

function countWords(text: string): number {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return 0;
  }

  return trimmed.split(/\s+/).length;
}

function resolveInsertEventType(insertedText: string): WritingEventType {
  return insertedText.length > 1 ? "paste" : "insert";
}

function buildWritingEventInputs(
  documentId: string,
  changes: ReturnType<typeof computeTextChanges>,
  wordCount: number,
  characterCount: number,
): WritingEventInput[] {
  return changes.map((change) => {
    if (change.type === "insert") {
      return {
        documentId,
        type: resolveInsertEventType(change.insertedText),
        contentLengthChange: change.insertedText.length,
        wordCount,
        characterCount,
        position: change.position,
        insertedText: change.insertedText,
        textPreview: createTextPreview(change),
      };
    }

    return {
      documentId,
      type: "delete",
      contentLengthChange: -change.deletedText.length,
      wordCount,
      characterCount,
      position: change.position,
      deletedText: change.deletedText,
      textPreview: createTextPreview(change),
    };
  });
}

export function WritingEditor({
  documentId,
  initialContent,
  onWritingEvents,
  onContentChange,
}: WritingEditorProps) {
  const previousTextRef = useRef<string | null>(null);
  const onWritingEventsRef = useRef(onWritingEvents);
  const onContentChangeRef = useRef(onContentChange);

  onWritingEventsRef.current = onWritingEvents;
  onContentChangeRef.current = onContentChange;

  const handleUpdate = (editor: Editor) => {
    const text = editor.getText();
    const previousText = previousTextRef.current ?? text;
    const changes = computeTextChanges(previousText, text);

    previousTextRef.current = text;
    onContentChangeRef.current?.(editor.getHTML());

    if (changes.length === 0) {
      return;
    }

    const inputs = buildWritingEventInputs(
      documentId,
      changes,
      countWords(text),
      text.length,
    );

    onWritingEventsRef.current?.(inputs);
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent ?? defaultContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: editorContentClass,
      },
    },
    onCreate: ({ editor: createdEditor }) => {
      previousTextRef.current = createdEditor.getText();
    },
    onUpdate: ({ editor: updatedEditor }) => {
      handleUpdate(updatedEditor);
    },
  });

  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 overflow-hidden pb-0 pt-(--card-spacing)">
      <div className="shrink-0">
        <EditorToolbar editor={editor} />
      </div>
      <CardContent className="min-h-0 flex-1 overflow-y-auto p-0">
        <div className="mx-auto max-w-3xl">
          <EditorContent editor={editor} />
        </div>
      </CardContent>
    </Card>
  );
}
