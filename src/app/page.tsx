import Link from "next/link";

import { APP_NAME } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold">{APP_NAME}</h1>
      <p className="max-w-md text-center text-muted-foreground">
        Track, verify, and replay your writing process.
      </p>
      <Link
        href="/dashboard"
        className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
      >
        Go to dashboard
      </Link>
    </div>
  );
}
