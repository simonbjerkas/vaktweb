"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Employee = {
  image: string;
  name: string;
  contact: {
    email: string;
    phone: string;
  };
  dob: string;
  address: string;
  locations: (string | undefined)[];
  role: string;
};

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;

      return <img src={image} alt="Employee" width={32} height={32} />;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "contact.email",
    header: "Email",
  },
  {
    accessorKey: "contact.phone",
    header: "Phone",
  },
  {
    accessorKey: "dob",
    header: "Date of birth",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "locations",
    header: "Locations",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];
