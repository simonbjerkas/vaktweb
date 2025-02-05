import ConvexClientProvider from "@/components/convex-client-provider";
import { Navbar } from "@/components/navbar";
import { UserMenu } from "@/components/user-menu";
import { HeartIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <span className="text-2xl">Vaktweb</span>
    </Link>
  );
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClientProvider>
      <div className="flex flex-col min-h-screen">
        <header className="container mx-auto py-8 flex items-center justify-between">
          <Logo />
          <Navbar />
          <UserMenu />
        </header>
        <div className="container mx-auto flex-1">{children}</div>
        <footer className="bg-muted text-center h-44 flex items-center justify-center gap-1">
          <p>Created for Trondheim Kino by a fellow movie lover</p>
          <HeartIcon className="size-5" />
        </footer>
      </div>
    </ConvexClientProvider>
  );
}
