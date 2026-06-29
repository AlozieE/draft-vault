import { Badge } from "@/components/ui/badge";
import { TopbarAuth } from "@/components/layout/topbar-auth";

export function Topbar() {
  return (
    <header className="flex h-14 min-w-0 items-center justify-between gap-3 border-b border-border px-4 sm:px-6 print:hidden">
      <p className="truncate font-medium">Draft Vault</p>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Badge variant="secondary" className="hidden sm:inline-flex">
          Prototype
        </Badge>
        <TopbarAuth />
      </div>
    </header>
  );
}
