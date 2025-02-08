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

export async function requireRole(requiredRole: Role) {
  const user = await getAuthUser();

  const roleHierarchy: Record<Role, number> = {
    admin: 3,
    moderator: 2,
    user: 1,
    new: 0,
  };

  if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
    redirect("/");
  }
}
