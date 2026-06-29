import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { APP_NAV_ITEMS } from "@/lib/app-nav";
import { APP_NAME } from "@/lib/constants";

export function AppSidebar() {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-sidebar md:flex print:hidden">
      <div className="p-4">
        <p className="text-sm font-semibold text-sidebar-foreground">
          {APP_NAME}
        </p>
      </div>
      <Separator />
      <nav className="flex flex-col gap-1 p-2">
        {APP_NAV_ITEMS.map((item) => (
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
