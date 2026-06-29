import { PenLine, Radio, Share2, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: PenLine,
    title: "Write",
    description:
      "Draft your work in the Draft Vault editor while your process is recorded in the background.",
  },
  {
    icon: Radio,
    title: "Record",
    description:
      "Your edits and progress are captured automatically as you write — nothing manual.",
  },
  {
    icon: ShieldCheck,
    title: "Verify",
    description:
      "Each event is linked in a hash chain so the drafting history stays tamper-evident.",
  },
  {
    icon: Share2,
    title: "Share",
    description:
      "Generate an authorship report and share it with a link or export it as a PDF.",
  },
] as const;

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold tracking-wide text-primary uppercase">
          How it works
        </span>
        <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
          Four simple steps from blank page to verified report
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
          Draft Vault runs quietly in the background while you focus on writing.
        </p>
      </div>

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <span className="font-mono text-sm font-medium text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-4 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <step.icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
