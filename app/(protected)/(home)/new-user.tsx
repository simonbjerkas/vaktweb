import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAuthUser } from "@/lib/auth";
import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function NewUser() {
  const user = await getAuthUser();
  if (!user || user.role !== "new") {
    return null;
  }
  return (
    <div className="flex items-center justify-between mb-4 border rounded-lg pr-4">
      <Alert className="border-none">
        <PersonIcon className="h-4 w-4" />
        <AlertTitle>Welcome {user.name}!</AlertTitle>
        <AlertDescription>
          As a new user, please update your account information.
        </AlertDescription>
      </Alert>
      <Button asChild>
        <Link href="/profile/update">Update Profile</Link>
      </Button>
    </div>
  );
}
