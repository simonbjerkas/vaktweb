import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@/convex/_generated/api";

export async function getAuthUser() {
  const user = await fetchQuery(
    api.users.viewer,
    {},
    { token: await convexAuthNextjsToken() },
  ).catch((error) => {
    if (error.message === "Not signed in") {
      redirect("/signin");
    }
    throw error;
  });

  return user;
}

type Role = "admin" | "moderator" | "user" | "new";

const roleValues = new Map<Role, number>([
  ["admin", 1],
  ["moderator", 2],
  ["user", 3],
  ["new", 4],
]);

export async function requireRole(role: Role) {
  const user = await getAuthUser();
  if (
    (roleValues.get(user.role) ?? Infinity) <
    (roleValues.get(role) ?? -Infinity)
  ) {
    redirect("/");
  }
  return user;
}
