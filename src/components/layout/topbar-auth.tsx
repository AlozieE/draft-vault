"use client";

import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export function TopbarAuth() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <span aria-hidden="true" className="inline-block size-8" />;
  }

  if (isSignedIn) {
    return <UserButton />;
  }

  return (
    <SignInButton mode="modal">
      <Button variant="secondary" size="sm">
        Sign in
      </Button>
    </SignInButton>
  );
}
