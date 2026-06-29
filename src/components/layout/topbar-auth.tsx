import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export async function TopbarAuth() {
  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <Button variant="secondary" size="sm">
            Sign in
          </Button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </>
  );
}
