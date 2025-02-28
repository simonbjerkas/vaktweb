"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";

const userSchema = z.object({
  email: z.string().email(),
});

export function AddNewUserForm() {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
    },
  });
  const addNewUser = useMutation(api.new_user.addNewUser);

  async function onSubmit(values: z.infer<typeof userSchema>) {
    await addNewUser({
      email: values.email,
    })
      .then(() => {
        toast.success("User added", {
          description: "User has been added to the database.",
        });
        form.reset();
      })
      .catch(() => {
        toast.error("Failed to add user", {
          description: "Please try again.",
          action: {
            label: "Try again",
            onClick: () => {
              onSubmit(values);
            },
          },
        });
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-end">
            <Button type="submit">Add User</Button>
          </div>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={() => <FormMessage />}
        />
      </form>
    </Form>
  );
}
