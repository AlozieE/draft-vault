import { Check, FileText, ShieldCheck } from "lucide-react";

import { LandingCtaButtons } from "@/components/landing/landing-cta-buttons";

const timeline = [
  { time: "09:14", label: "Outline created", words: "120 words" },
  { time: "09:41", label: "First draft", words: "640 words" },
  { time: "10:23", label: "Revisions", words: "1,180 words" },
  { time: "11:05", label: "Final edits", words: "1,420 words" },
] as const;

export function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-secondary/60 via-background to-background"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            Process evidence, not guesswork
          </span>
          <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Show how your work was written.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Draft Vault records your writing process, verifies your drafting
            timeline, and creates shareable authorship reports that demonstrate
            how your work came together.
          </p>
          <LandingCtaButtons />
          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
            {["Private by default", "Tamper-evident logs", "Export anytime"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="relative min-w-0">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <FileText className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">Authorship report</p>
                  <p className="truncate text-xs text-muted-foreground">
                    Essay — Modern History
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <ShieldCheck className="size-3.5" aria-hidden="true" />
                Verified
              </span>
            </div>

            <ol className="mt-5 space-y-4">
              {timeline.map((step, index) => (
                <li key={step.time} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <span className="flex size-2.5 items-center justify-center rounded-full bg-primary" />
                    {index < timeline.length - 1 ? (
                      <span
                        className="mt-1 h-8 w-px bg-border"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{step.label}</p>
                      <p className="text-xs text-muted-foreground">{step.words}</p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-muted-foreground">
                      {step.time}
                    </span>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-5 rounded-lg bg-muted px-4 py-3">
              <p className="break-all font-mono text-xs text-muted-foreground">
                hash: 3f9a…c12e · 1,420 words · 1h 51m
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
