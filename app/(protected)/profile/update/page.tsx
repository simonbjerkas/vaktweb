import { fetchQuery } from "convex/nextjs";
import UpdateUserForm from "./update-user-form";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { redirect } from "next/navigation";

export default async function UpdateProfilePage() {
  const user = await fetchQuery(
    api.users.viewer,
    {},
    { token: await convexAuthNextjsToken() },
  ).catch(() => {
    redirect("/signin");
  });
  return (
    <div>
      <UpdateUserForm user={user} />
    </div>
  );
}
