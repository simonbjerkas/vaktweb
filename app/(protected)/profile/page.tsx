import { getAuthUser } from "@/lib/auth";
import { format } from "date-fns";
import { Notifications } from "./_notifications";
export default async function ProfilePage() {
  const user = await getAuthUser();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-sm text-gray-500">
          Last logged in {format(user.last_login, "dd.MM.yyyy HH:mm")}
        </p>
      </div>
      <Notifications userId={user._id} />
    </div>
  );
}
