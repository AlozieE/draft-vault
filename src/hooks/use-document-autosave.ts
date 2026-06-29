"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { updateDocumentContent } from "@/actions/document-actions";
import { logError } from "@/lib/log-error";

export type AutosaveStatus = "saved" | "saving" | "unsaved";

const AUTOSAVE_DELAY_MS = 800;

export function useDocumentAutosave(documentId: string) {
  const [autosaveStatus, setAutosaveStatus] = useState<AutosaveStatus>("saved");
  const saveTimeoutRef = useRef<number | null>(null);
  const latestContentRef = useRef<string>("");

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const handleContentChange = useCallback(
    (content: string) => {
      latestContentRef.current = content;
      setAutosaveStatus("unsaved");

      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = window.setTimeout(() => {
        void (async () => {
          setAutosaveStatus("saving");

          try {
            await updateDocumentContent(documentId, latestContentRef.current);
            setAutosaveStatus("saved");
          } catch (error: unknown) {
            logError("Failed to autosave document content:", error);
            setAutosaveStatus("unsaved");
          }
        })();
      }, AUTOSAVE_DELAY_MS);
    },
    [documentId],
  );

  return {
    autosaveStatus,
    handleContentChange,
  };
}

export function getAutosaveStatusLabel(status: AutosaveStatus): string {
  switch (status) {
    case "saving":
      return "Saving...";
    case "unsaved":
      return "Unsaved changes";
    case "saved":
      return "Saved";
  }
}
