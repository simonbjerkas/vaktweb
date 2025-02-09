import { getAuthUser } from "@/lib/auth";
import { format } from "date-fns";

export default async function ProfilePage() {
  const user = await getAuthUser();
  return (
    <div>
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-sm text-gray-500">
        Last logged in {format(user.last_login, "dd.MM.yyyy HH:mm")}
      </p>
    </div>
  );
}
