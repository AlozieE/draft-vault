"use client";

import { useState } from "react";

import { createShareLink } from "@/actions/share-link-actions";
import { Button } from "@/components/ui/button";
import { buildShareUrl } from "@/lib/app-url";

type ShareLinkButtonProps = {
  documentId: string;
};

export function ShareLinkButton({ documentId }: ShareLinkButtonProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  async function handleCreateShareLink() {
    setIsCreating(true);
    setStatusMessage(null);

    try {
      const shareLink = await createShareLink(documentId);
      const url = buildShareUrl(shareLink.token);

      setShareUrl(url);

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setStatusMessage("Copied");
      } else {
        setStatusMessage("Share link created");
      }
    } catch (error: unknown) {
      console.error("Failed to create share link:", error);
      setStatusMessage("Failed to create share link");
    } finally {
      setIsCreating(false);
    }
  }

  async function handleCopyAgain() {
    if (!shareUrl || !navigator.clipboard?.writeText) {
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    setStatusMessage("Copied");
  }

  return (
    <div className="flex w-full min-w-0 flex-col items-stretch gap-2 sm:w-auto sm:items-end">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={shareUrl ? handleCopyAgain : handleCreateShareLink}
        disabled={isCreating}
        className="w-full sm:w-auto"
      >
        {isCreating
          ? "Creating..."
          : shareUrl
            ? "Copy link"
            : "Create share link"}
      </Button>
      {shareUrl ? (
        <p className="max-w-full truncate text-xs break-all text-muted-foreground sm:max-w-xs">
          {shareUrl}
        </p>
      ) : null}
      {statusMessage ? (
        <p className="text-xs text-muted-foreground">{statusMessage}</p>
      ) : null}
    </div>
  );
}
