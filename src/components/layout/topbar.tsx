import { Badge } from "@/components/ui/badge";

export function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-6">
      <p className="font-medium">Draft Vault</p>
      <Badge variant="secondary">Prototype</Badge>
    </header>
  );
}
