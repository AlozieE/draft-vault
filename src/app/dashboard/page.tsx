import { AppShell } from "@/components/layout/app-shell";
import { DocumentCard } from "@/components/documents/document-card";
import { Button } from "@/components/ui/button";

const documents = [
  {
    title: "History Essay",
    status: "Drafting",
    updatedAt: "Jun 28, 2026",
    href: "/documents/history-essay",
  },
  {
    title: "Research Paper",
    status: "Verified",
    updatedAt: "Jun 27, 2026",
    href: "/documents/research-paper",
  },
  {
    title: "Literature Review",
    status: "Report ready",
    updatedAt: "Jun 25, 2026",
    href: "/documents/literature-review",
  },
] as const;

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Your documents</h1>
          <Button>New document</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((document) => (
            <DocumentCard key={document.href} {...document} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
