import { getAuthUser } from "@/lib/auth";
import { UpdateUserForm } from "./update-user-form";

export default async function UpdateProfilePage() {
  const user = await getAuthUser();
  return (
    <div>
      <UpdateUserForm user={user} />
    </div>
  );
}
