import { getAuthUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await getAuthUser();
  return <div>{user.name}</div>;
}
