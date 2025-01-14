import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { UserMenu } from "@/components/user-menu";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import {
  HomeIcon,
  ResumeIcon as ScreeningIcon,
  ReaderIcon as ReportIcon,
  PersonIcon as EmployeeIcon,
} from "@radix-ui/react-icons";
import { fetchQuery } from "convex/nextjs";

import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const links = [
  { href: "/", label: "Home", icon: <HomeIcon /> },
  { href: "/screenings", label: "Screenings", icon: <ScreeningIcon /> },
  { href: "/reports", label: "Reports", icon: <ReportIcon /> },
  { href: "/employees", label: "Employees", icon: <EmployeeIcon /> },
];

const Navbar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-8">
        {links.map((link) => {
          return (
            <NavigationMenuItem key={link.href}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "gap-2")}
                >
                  {link.icon}
                  {link.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

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
  return <UserMenu>{user.name}</UserMenu>;
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
      <div>{children}</div>
      <footer></footer>
    </>
  );
}
