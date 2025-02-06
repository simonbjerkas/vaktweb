import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await fetchQuery(
    api.users.viewer,
    {},
    { token: await convexAuthNextjsToken() },
  );

  if (user.role === "new") redirect("/profile/update");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to the app</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Should use parallel routes for the different news if it make sense.
        </p>
      </CardContent>
    </Card>
  );
}
