import { AlertTriangle, GitBranch } from "lucide-react";

export function LandingProblemSection() {
  return (
    <section id="problem" className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-5">
          <span className="text-sm font-semibold tracking-wide text-primary uppercase">
            Why Draft Vault
          </span>
          <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
            AI detectors guess. Your process tells the real story.
          </h2>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            AI detection tools are often uncertain and can flag honest work
            incorrectly. Instead of trying to guess whether text was
            AI-generated, Draft Vault focuses on something concrete: the
            evidence of how your work was actually written.
          </p>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            By capturing your drafting timeline, edits, and revisions over time,
            Draft Vault gives you a clear, calm way to show your effort — without
            putting you on the defensive.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-xl border border-border bg-background p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-medium">The detector approach</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Scans finished text and assigns a probability score. Results can be
              inconsistent, hard to explain, and leave students defending work
              they genuinely did.
            </p>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <GitBranch className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-medium">The Draft Vault approach</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Records the writing process as it happens, then verifies the
              timeline so you can show how a piece developed from outline to
              final draft.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
