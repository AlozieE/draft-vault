"use client";

import type { Editor } from "@tiptap/react";

import { Button } from "@/components/ui/button";

type EditorToolbarProps = {
  editor: Editor | null;
};

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const disabled = editor === null;

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        Bold
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        Italic
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        Heading
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        Bullet List
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={() => editor?.chain().focus().undo().run()}
      >
        Undo
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={() => editor?.chain().focus().redo().run()}
      >
        Redo
      </Button>
    </div>
  );
}
