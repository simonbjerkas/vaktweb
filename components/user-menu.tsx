"use client";

import { useEffect, useState } from "react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

import Link from "next/link";
import { redirect } from "next/navigation";

import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";

export function UserMenu({
  preloadedUser,
}: {
  preloadedUser: Preloaded<typeof api.users.viewer>;
}) {
  const [open, setOpen] = useState(false);
  const user = usePreloadedQuery(preloadedUser);
  const notificationsCount = useQuery(api.notifications.getNotificationsCount, {
    recipient: user._id,
  });

  useEffect(() => {
    if (typeof notificationsCount === "number" && notificationsCount > 0) {
      toast("You have new notifications", {
        description: `${notificationsCount} new notifications`,
        action: {
          label: "View",
          onClick: () => {
            redirect("/profile");
          },
        },
      });
    }
  }, [notificationsCount]);
  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      {user.name}
      <div className="relative">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full md:mr-8 lg:mr-0"
            >
              <Avatar className="size-8">
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
              <Link href="/admin">
                <DropdownMenuItem>Admin</DropdownMenuItem>
              </Link>
            )}
            <SignOutButton />
          </DropdownMenuContent>
        </DropdownMenu>
        {typeof notificationsCount === "number" && notificationsCount > 0 && (
          <span
            onClick={() => setOpen((prev) => !prev)}
            className="absolute size-5 cursor-pointer -right-1 md:right-7 lg:-right-1 -top-1 p-0.5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
          >
            {notificationsCount}
          </span>
        )}
      </div>
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
