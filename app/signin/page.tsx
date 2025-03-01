"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { GitHubLogoIcon } from "@/components/github-icon";
import { GoogleLogoIcon } from "@/components/google-icon";
import { Button } from "@/components/ui/button";
import { SignInMethodDivider } from "@/components/sigin-method-divider";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full container my-auto mx-auto">
      <div className="max-w-[384px] mx-auto flex flex-1 flex-col my-auto gap-4 pb-8">
        <h2 className="font-semibold text-2xl tracking-tight">Sign in</h2>
        <SignInWithGoogle />
        <SignInMethodDivider />
        <SignInWithGitHub />
      </div>
    </div>
  );
}

function SignInWithGitHub() {
  const { signIn } = useAuthActions();
  return (
    <Button
      className="flex-1"
      variant="outline"
      type="button"
      onClick={() => void signIn("github", { redirectTo: "/" })}
    >
      <GitHubLogoIcon className="mr-2 h-4 w-4" /> GitHub
    </Button>
  );
}

function SignInWithGoogle() {
  const { signIn } = useAuthActions();
  return (
    <Button
      className="flex-1"
      variant="outline"
      type="button"
      onClick={() =>
        void signIn("google", {
          redirectTo: "/",
        })
      }
    >
      <GoogleLogoIcon className="mr-2 h-4 w-4" /> Google
    </Button>
  );
}
