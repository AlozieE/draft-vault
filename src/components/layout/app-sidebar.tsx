import Link from "next/link";

import { APP_NAME } from "@/lib/constants";

export function AppSidebar() {
  return (
    <aside className="flex w-56 flex-col border-r border-border bg-sidebar p-4">
      <p className="mb-6 text-sm font-semibold text-sidebar-foreground">
        {APP_NAME}
      </p>
      <nav className="flex flex-col gap-2 text-sm">
        <Link href="/dashboard" className="text-sidebar-foreground hover:underline">
          Dashboard
        </Link>
      </nav>
    </aside>
  );
}
