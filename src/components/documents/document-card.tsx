"use client";

import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DocumentCardProps = {
  id: string;
  title: string;
  status?: string;
  updatedAt: string;
  eventCount?: number;
  isDeleting?: boolean;
  onDelete?: (documentId: string) => void;
};

export function DocumentCard({
  id,
  title,
  status = "Draft",
  updatedAt,
  eventCount,
  isDeleting = false,
  onDelete,
}: DocumentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardAction>
          <Badge variant="secondary">{status}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-sm text-muted-foreground">Updated {updatedAt}</p>
        {eventCount !== undefined ? (
          <p className="text-sm text-muted-foreground">
            {eventCount} writing {eventCount === 1 ? "event" : "events"}
          </p>
        ) : null}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/documents/${id}`}>Open</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/replay/${id}`}>Replay</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/report/${id}`}>Report</Link>
        </Button>
        {onDelete ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete document?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete &ldquo;{title}&rdquo; and all of
                  its writing events.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => onDelete(id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
      </CardFooter>
    </Card>
  );
}
