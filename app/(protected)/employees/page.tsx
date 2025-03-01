"use client";

import { api } from "@/convex/_generated/api";
import { format } from "date-fns";

import { columns, Employee } from "./columns";
import { DataTable } from "@/components/data-table";

import { useMemo } from "react";
import { useQuery } from "convex/react";

export default function Employees() {
  const employees = useQuery(api.users.getAllUsers);
  const data: Employee[] = useMemo(() => {
    if (!employees) return [];
    return employees.map((employee) => ({
      image: employee.image ?? "",
      name: employee.name ?? "",
      contact: {
        email: employee.email ?? "",
        phone: employee.phone ?? "",
      },
      dob: employee.dob ? format(employee.dob, "dd.MM.yyyy") : "",
      address: `${employee.address}, ${employee.city} ${employee.zip}`,
      locations: employee.locations ?? [],
      role: employee.role ?? "",
    }));
  }, [employees]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
