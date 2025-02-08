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
import { PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
export function UserMenu({
  preloadedUser,
}: {
  preloadedUser: Preloaded<typeof api.users.viewer>;
}) {
  const user = usePreloadedQuery(preloadedUser);
  const pathname = usePathname();
  if (user.role === "new" && pathname !== "/profile/update") {
    redirect("/profile/update");
  }
  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      {user.name}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full mr-8 lg:mr-0"
          >
            <PersonIcon className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href="/profile">
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          </Link>
          {user.role === "admin" && (
            <DropdownMenuItem>
              <Link href="/admin">Admin</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex items-center gap-2 py-0 font-normal">
            Theme
            <ThemeToggle />
          </DropdownMenuLabel>
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
