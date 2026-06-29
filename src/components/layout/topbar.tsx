import { Badge } from "@/components/ui/badge";
import { TopbarAuth } from "@/components/layout/topbar-auth";

export function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-6">
      <p className="font-medium">Draft Vault</p>
      <div className="flex items-center gap-3">
        <Badge variant="secondary">Prototype</Badge>
        <TopbarAuth />
      </div>
    </header>
  );
}
