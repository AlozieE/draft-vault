"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export function SignInCta() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded || isSignedIn) {
    return null;
  }

  return (
    <SignInButton mode="modal">
      <Button variant="secondary" className="w-full sm:w-auto">
        Sign in to start writing
      </Button>
    </SignInButton>
  );
}
