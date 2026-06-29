"use client";

import { SignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LandingSignInButtonProps = {
  variant?: "ghost" | "outline" | "secondary";
  className?: string;
};

export function LandingSignInButton({
  variant = "ghost",
  className,
}: LandingSignInButtonProps) {
  return (
    <SignInButton mode="modal">
      <Button variant={variant} size="lg" className={cn("h-11 px-5 text-base", className)}>
        Sign in
      </Button>
    </SignInButton>
  );
}
