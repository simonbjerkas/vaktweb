"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "./ui/badge";

export function Combobox({
  tags,
  value,
  onChange,
  placeholder,
}: {
  tags: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? value.map((tag) => {
                  const tagLabel = tags.find((t) => t === tag);
                  return tagLabel ? <Badge key={tag}>{tagLabel}</Badge> : "";
                })
              : (placeholder ?? "Select a tag...")}
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[8rem] p-0">
          <Command>
            <CommandInput placeholder="Search a tag..." />
            <CommandList>
              <CommandEmpty>No tag found.</CommandEmpty>
              <CommandGroup>
                {tags.map((tag) => (
                  <CommandItem
                    key={tag}
                    value={tag}
                    onSelect={(currentValue) => {
                      onChange?.(
                        value?.includes(currentValue)
                          ? value.filter((v) => v !== currentValue)
                          : [...(value ?? []), currentValue],
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.includes(tag) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {tag}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
