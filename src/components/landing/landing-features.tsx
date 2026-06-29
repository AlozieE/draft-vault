import {
  Clock,
  FileDown,
  Link2,
  Lock,
  PlayCircle,
  ScrollText,
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Writing timeline",
    description:
      "A chronological view of how your draft evolved, from first outline to final word count.",
  },
  {
    icon: Lock,
    title: "Hash-chain verification",
    description:
      "Each writing event is linked with a cryptographic hash, so the drafting order stays tamper-evident.",
  },
  {
    icon: PlayCircle,
    title: "Replay",
    description:
      "Watch your document rebuild itself over time to see exactly how ideas took shape.",
  },
  {
    icon: ScrollText,
    title: "Authorship report",
    description:
      "A readable summary of your process — sessions, edits, and time spent — in one place.",
  },
  {
    icon: Link2,
    title: "Share link",
    description:
      "Send instructors or reviewers a private link to your verified report, no account needed.",
  },
  {
    icon: FileDown,
    title: "PDF export",
    description:
      "Export a printable authorship report from your browser whenever you need it.",
  },
] as const;

export function LandingFeatures() {
  return (
    <section id="features" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wide text-primary uppercase">
            Features
          </span>
          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl">
            Everything you need to document your process
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
            Built for students who want to stand behind their work with confidence.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-sm"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
