"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { EditorToolbar } from "@/components/editor/editor-toolbar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const editorContentClass = cn(
  "min-h-[500px] w-full bg-background px-8 py-6 text-base leading-relaxed outline-none",
  "[&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold",
  "[&_p]:mb-3",
  "[&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6",
);

export function WritingEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing your draft here...</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: editorContentClass,
      },
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
