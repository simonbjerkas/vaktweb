"use client";

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
import { useQuery } from "convex/react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function ArchievedUsers() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    _id: string;
    name: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium">Archieved users</h2>
      <Separator className="my-4" />
      <section className="flex gap-2 items-center">
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
                        setSelectedUser({
                          _id: user._id,
                          name: user.name,
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
        <Button>Restore user</Button>
      </section>
    </div>
  );
}
