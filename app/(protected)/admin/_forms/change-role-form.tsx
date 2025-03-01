"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown, Loader2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

const userSchema = z.object({
  role: z.enum(["admin", "moderator", "user"]),
});

export function ChangeRoleForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<{
    _id: string;
    name: string;
    role: "admin" | "moderator" | "user";
  } | null>(null);

  const updateUserRole = useMutation(api.users.updateUserRole);
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: undefined,
    },
  });

  const debounced = useDebouncedCallback((value) => {
    setLoading(true);
    setSearch(value);
  }, 500);

  const users = useQuery(api.users.searchUsers, {
    query: search,
  });

  useEffect(() => {
    if (users) {
      setLoading(false);
    }
  }, [users]);

  async function onSubmit(values: z.infer<typeof userSchema>) {
    if (!selectedUser) {
      return;
    }
    await updateUserRole({
      userId: selectedUser._id as Id<"users">,
      role: values.role,
    })
      .then(() => {
        toast.success("User role updated", {
          description: `User ${selectedUser.name} role has been updated to ${values.role}.`,
        });
        form.reset();
        setSelectedUser(null);
      })
      .catch(() => {
        toast.error("Failed to update user role", {
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
    <>
      <div className="flex gap-2 items-end mb-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedUser ? selectedUser.name : "Select a user..."}
              <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] min-w-[8rem] p-0">
            <Command>
              <Input
                className="ring-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                placeholder="Search a user..."
                onChange={(e) => {
                  debounced(e.target.value);
                }}
              />
              <Separator />
              <CommandList>
                <CommandEmpty>
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <Loader2 className="size-4 animate-spin" />
                    </div>
                  ) : (
                    "No users found."
                  )}
                </CommandEmpty>
                <CommandGroup>
                  {users?.map((user) => (
                    <CommandItem
                      key={user._id}
                      value={user._id}
                      onSelect={() => {
                        if (user.role === "new") {
                          return;
                        }
                        setSelectedUser({
                          _id: user._id,
                          name: user.name,
                          role: user.role,
                        });
                        setOpen(false);
                      }}
                    >
                      {user.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Role</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!selectedUser}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <Button type="submit" disabled={!selectedUser}>
                      Change role
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
}
