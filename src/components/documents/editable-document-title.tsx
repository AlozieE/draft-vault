"use client";

import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";

import { updateDocumentTitle } from "@/actions/document-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type EditableDocumentTitleProps = {
  documentId: string;
  initialTitle: string;
};

export function EditableDocumentTitle({
  documentId,
  initialTitle,
}: EditableDocumentTitleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isCancelingRef = useRef(false);
  const [title, setTitle] = useState(initialTitle);
  const [draftTitle, setDraftTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  function startEditing() {
    setDraftTitle(title);
    setIsEditing(true);
  }

  function cancelEditing() {
    isCancelingRef.current = true;
    setDraftTitle(title);
    setIsEditing(false);
  }

  async function saveTitle() {
    if (isSaving) {
      return;
    }

    setIsSaving(true);
    setIsEditing(false);

    try {
      const updatedDocument = await updateDocumentTitle(documentId, draftTitle);
      setTitle(updatedDocument.title);
      setDraftTitle(updatedDocument.title);
    } catch {
      setDraftTitle(title);
    } finally {
      setIsSaving(false);
    }
  }

  function handleBlur() {
    if (isCancelingRef.current) {
      isCancelingRef.current = false;
      return;
    }

    void saveTitle();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      void saveTitle();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      cancelEditing();
    }
  }

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        value={draftTitle}
        onChange={(event) => setDraftTitle(event.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={isSaving}
        aria-label="Document title"
        className="max-w-xl text-2xl font-semibold"
      />
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={startEditing}
        className="text-left text-2xl font-semibold hover:text-foreground/80"
      >
        {title}
      </button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={startEditing}
        aria-label="Edit document title"
      >
        <Pencil />
      </Button>
    </div>
  );
}
