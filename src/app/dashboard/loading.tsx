import { AppShell } from "@/components/layout/app-shell";
import { DashboardSkeleton } from "@/components/documents/dashboard-skeleton";

export default function DashboardLoading() {
  return (
    <AppShell>
      <DashboardSkeleton />
    </AppShell>
  );
}
