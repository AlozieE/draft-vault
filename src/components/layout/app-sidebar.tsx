import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { APP_NAME } from "@/lib/constants";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/sample-report", label: "Sample report" },
] as const;

export function AppSidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-sidebar print:hidden">
      <div className="p-4">
        <p className="text-sm font-semibold text-sidebar-foreground">
          {APP_NAME}
        </p>
      </div>
      <Separator />
      <nav className="flex flex-col gap-1 p-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
