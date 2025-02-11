import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreateNewHallForm } from "./_forms/create-hall-form";
import { CreateNewLocationForm } from "./_forms/create-location-form";
import { AddNewUserForm } from "./_forms/add-new-user-form";
import { ChangeRoleForm } from "./_forms/change-role-form";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ArchievedUsers } from "./archieved-users";

export default function Admin() {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <h1 className="text-2xl font-bold">Admin</h1>
      <p className="text-sm text-muted-foreground">
        Manage your locations and halls here.
      </p>
      <Separator className="my-4" />
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Users</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Add new user</CardTitle>
              <CardDescription>Add a new user to the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <AddNewUserForm />
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>User roles</CardTitle>
              <CardDescription>
                View all users in the system and their roles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChangeRoleForm />
            </CardContent>
          </Card>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Archieved users</AccordionTrigger>
            <AccordionContent>
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Archieved users</CardTitle>
                  <CardDescription>
                    View all users in the system that have been archived.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ArchievedUsers />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <Separator className="my-4" />
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Locations and Halls</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Create New Location</CardTitle>
              <CardDescription>
                Create a new location to add to the database.
              </CardDescription>
            </CardHeader>
            <CardContent>content</CardContent>
            <CardFooter>
              <CreateNewLocationForm />
            </CardFooter>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Create New Hall</CardTitle>
              <CardDescription>
                Create a new hall to add to the database.
              </CardDescription>
            </CardHeader>
            <CardContent>content</CardContent>
            <CardFooter>
              <CreateNewHallForm />
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
