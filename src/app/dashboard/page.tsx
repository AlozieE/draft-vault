import { getDocuments } from "@/actions/document-actions";
import { DocumentDashboard } from "@/components/documents/document-dashboard";
import { AppShell } from "@/components/layout/app-shell";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const documents = await getDocuments();

  return (
    <AppShell>
      <DocumentDashboard initialDocuments={documents} />
    </AppShell>
  );
}
