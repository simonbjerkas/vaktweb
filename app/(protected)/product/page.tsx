import { Chat } from "@/app/(protected)/product/Chat/Chat";
import { UserMenu } from "@/components/user-menu";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";

export default async function ProductPage() {
  const viewer = await fetchQuery(
    api.users.viewer,
    {},
    { token: await convexAuthNextjsToken() },
  );
  return (
    <main className="flex max-h-screen grow flex-col overflow-hidden">
      <div className="flex items-start justify-between border-b p-4">
        <UserMenu>{viewer.name}</UserMenu>
      </div>
      <Chat viewer={viewer._id} />
    </main>
  );
}
