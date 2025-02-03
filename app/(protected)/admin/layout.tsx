import ConvexClientProvider from "@/components/convex-client-provider";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchQuery(
    api.users.viewer,
    {},
    { token: await convexAuthNextjsToken() },
  );
  if (user.role !== "admin") {
    return redirect("/");
  }

  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
