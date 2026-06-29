import { Info } from "lucide-react";

import { LandingCtaButtons } from "@/components/landing/landing-cta-buttons";
import { REPORT_PRINT_DISCLAIMER } from "@/lib/report-export";

export function LandingDisclaimerSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="overflow-hidden rounded-2xl border border-border bg-primary text-primary-foreground">
        <div className="flex flex-col gap-8 p-8 md:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
              Ready to show your process?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-pretty text-primary-foreground/80">
              Start writing with Draft Vault today and build a verified record of
              how your work comes together.
            </p>
          </div>
          <LandingCtaButtons
            layout="column"
            secondaryButtonClassName="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          />
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-xl border border-border bg-muted/50 p-5">
        <Info
          className="mt-0.5 size-5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">A note on what this means: </span>
          {REPORT_PRINT_DISCLAIMER} It is intended to complement — not replace —
          academic judgment and honest conversation.
        </p>
      </div>
    </section>
  );
}
