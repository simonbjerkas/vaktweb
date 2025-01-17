import { fetchQuery } from "convex/nextjs";
import UpdateUserForm from "./update-user-form";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";

export default async function UpdateProfilePage() {
  const user = await fetchQuery(
    api.users.viewer,
    {},
    { token: await convexAuthNextjsToken() },
  );
  return (
    <div>
      <UpdateUserForm user={user} />
    </div>
  );
}
