import Link from "next/link";
import { Clock, FileCheck, Shield } from "lucide-react";

import { SignInCta } from "@/components/auth/sign-in-cta";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";

const features = [
  {
    title: "Writing Timeline",
    description:
      "Capture every keystroke, pause, and revision in a chronological record of how your draft evolved.",
    icon: Clock,
  },
  {
    title: "Tamper-Evident Logs",
    description:
      "Each event is linked in a hash chain so edits to the log are detectable and verifiable.",
    icon: Shield,
  },
  {
    title: "Authorship Reports",
    description:
      "Generate shareable reports that summarize writing time, paste events, and verification status.",
    icon: FileCheck,
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-hidden">
      <main className="mx-auto flex w-full max-w-5xl min-w-0 flex-1 flex-col gap-12 px-4 py-12 sm:gap-16 sm:px-6 sm:py-20">
        <section className="flex flex-col items-center gap-4 text-center sm:gap-6">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            {APP_NAME}
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            Protect your writing process with verifiable authorship timelines.
          </p>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Draft Vault records your drafting process and helps generate
            tamper-evident authorship reports when your work is questioned.
          </p>
          <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <SignInCta />
            <Button asChild className="w-full sm:w-auto">
              <Link href="/dashboard">Open Dashboard</Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/documents/demo">View Demo</Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} size="sm">
              <CardHeader>
                <feature.icon className="mb-2 size-5 text-muted-foreground" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
