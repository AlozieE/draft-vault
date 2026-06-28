import { AppShell } from "@/components/layout/app-shell";
import { DocumentCard } from "@/components/documents/document-card";

const placeholderDocuments = [
  {
    id: "doc-1",
    title: "Untitled draft",
    createdAt: "2026-06-28",
    updatedAt: "2026-06-28",
  },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
