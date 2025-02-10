"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthActions } from "@convex-dev/auth/react";
import Link from "next/link";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserMenu({
  preloadedUser,
}: {
  preloadedUser: Preloaded<typeof api.users.viewer>;
}) {
  const user = usePreloadedQuery(preloadedUser);
  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      {user.name}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full md:mr-8"
          >
            <Avatar>
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-2">
          <DropdownMenuLabel className="flex items-center gap-2 py-0 font-normal">
            Theme
            <ThemeToggle />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/profile">
            <DropdownMenuItem>Your profile</DropdownMenuItem>
          </Link>
          {user.role === "admin" && (
            <DropdownMenuItem>
              <Link href="/admin">Admin</Link>
            </DropdownMenuItem>
          )}
          <SignOutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function SignOutButton() {
  const { signOut } = useAuthActions();
  return (
    <DropdownMenuItem
      onClick={async () => {
        await signOut();
        window.location.reload();
      }}
    >
      Sign out
    </DropdownMenuItem>
  );
}
