import { Skeleton } from "@/components/ui/skeleton";
import { UserMenu } from "@/components/user-menu";
import { Navbar } from "@/components/navbar";
import { HeartIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import { Suspense } from "react";

import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";

const Logo = () => {
  return (
    <Link href="/">
      <span className="text-2xl">Vaktweb</span>
    </Link>
  );
};

const UserData = async () => {
  const user = await fetchQuery(
    api.users.viewer,
    {},
    { token: await convexAuthNextjsToken() },
  );
  return <UserMenu user={user} />;
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto py-8 flex items-center justify-between">
        <Logo />
        <Navbar />
        <Suspense
          fallback={
            <div className="flex items-center gap-2">
              <Skeleton className="w-24 h-5" />
              <Skeleton className="size-9 rounded-full" />
            </div>
          }
        >
          <UserData />
        </Suspense>
      </header>
      <div className="container mx-auto flex-1">{children}</div>
      <footer className="bg-muted text-center h-44 flex items-center justify-center gap-1">
        <p>Created for Trondheim Kino by a fellow movie lover</p>
        <HeartIcon className="size-5" />
      </footer>
    </div>
  );
}
