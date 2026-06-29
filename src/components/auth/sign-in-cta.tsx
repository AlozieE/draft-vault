import { Show, SignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export async function SignInCta() {
  return (
    <Show when="signed-out">
      <SignInButton mode="modal">
        <Button variant="secondary">Sign in to start writing</Button>
      </SignInButton>
    </Show>
  );
}
