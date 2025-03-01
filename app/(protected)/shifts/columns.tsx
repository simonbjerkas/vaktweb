"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Shift = {
  name: string;
  role: "leader" | "host";
  start: string;
  end: string;
  hours: number;
  location: string;
  note?: string;
};

export const columns: ColumnDef<Shift>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  { accessorKey: "start", header: "Start" },
  { accessorKey: "end", header: "End" },
  { accessorKey: "hours", header: "Hours" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "note", header: "Note" },
];
