import { ReplayPlayer } from "@/components/replay/replay-player";
import { AppShell } from "@/components/layout/app-shell";
import { GENESIS_HASH } from "@/lib/constants";
import type { WritingEvent } from "@/types/writing-event";

type ReplayPageProps = {
  params: Promise<{ id: string }>;
};

const sampleReplayEvents: WritingEvent[] = [
  {
    id: "replay-event-1",
    documentId: "demo",
    type: "insert",
    timestamp: "2026-06-28T14:04:00.000Z",
    contentLengthChange: 12,
    wordCount: 2,
    characterCount: 12,
    textPreview: "Introduction",
    previousHash: GENESIS_HASH,
    eventHash: "a1b2c3d4e5f6789012345678901234567890abcd",
  },
  {
    id: "replay-event-2",
    documentId: "demo",
    type: "insert",
    timestamp: "2026-06-28T14:18:00.000Z",
    contentLengthChange: 28,
    wordCount: 5,
    characterCount: 40,
    textPreview: " — draft thesis statement.",
    previousHash: "a1b2c3d4e5f6789012345678901234567890abcd",
    eventHash: "b2c3d4e5f6789012345678901234567890abcde1",
  },
  {
    id: "replay-event-3",
    documentId: "demo",
    type: "delete",
    timestamp: "2026-06-28T14:22:00.000Z",
    contentLengthChange: -5,
    wordCount: 4,
    characterCount: 35,
    previousHash: "b2c3d4e5f6789012345678901234567890abcde1",
    eventHash: "c3d4e5f6789012345678901234567890abcde12f",
  },
  {
    id: "replay-event-4",
    documentId: "demo",
    type: "paste",
    timestamp: "2026-06-28T14:31:00.000Z",
    contentLengthChange: 18,
    wordCount: 7,
    characterCount: 53,
    textPreview: " supporting evidence",
    previousHash: "c3d4e5f6789012345678901234567890abcde12f",
    eventHash: "d4e5f6789012345678901234567890abcde12f34",
  },
  {
    id: "replay-event-5",
    documentId: "demo",
    type: "insert",
    timestamp: "2026-06-28T14:41:00.000Z",
    contentLengthChange: 14,
    wordCount: 9,
    characterCount: 67,
    textPreview: " for analysis.",
    previousHash: "d4e5f6789012345678901234567890abcde12f34",
    eventHash: "e5f6789012345678901234567890abcde12f3456",
  },
  {
    id: "replay-event-6",
    documentId: "demo",
    type: "snapshot",
    timestamp: "2026-06-28T14:45:00.000Z",
    contentLengthChange: 0,
    wordCount: 9,
    characterCount: 67,
    previousHash: "e5f6789012345678901234567890abcde12f3456",
    eventHash: "f6789012345678901234567890abcde12f345678",
  },
];

export default async function ReplayPage({ params }: ReplayPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Writing Replay</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Replay the document creation process from recorded writing events.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Session: {id.replace(/-/g, " ")}
          </p>
        </div>

        <ReplayPlayer events={sampleReplayEvents} />
      </div>
    </AppShell>
  );
}
