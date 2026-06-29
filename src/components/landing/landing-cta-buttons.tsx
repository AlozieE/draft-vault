import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LandingCtaButtonsProps = {
  className?: string;
  secondaryButtonClassName?: string;
  layout?: "row" | "column";
};

export function LandingCtaButtons({
  className,
  secondaryButtonClassName,
  layout = "row",
}: LandingCtaButtonsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        layout === "row" ? "sm:flex-row" : "lg:flex-col",
        className,
      )}
    >
      <Button asChild size="lg" className="h-11 px-5 text-base">
        <Link href="/dashboard">
          Start writing
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className={cn("h-11 px-5 text-base", secondaryButtonClassName)}
      >
        <Link href="/sample-report">View sample report</Link>
      </Button>
    </div>
  );
}
