import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { EmployeeTable } from "./emplyee-table";

export default async function Employees() {
  const preloadedEmployees = await preloadQuery(api.users.getAllUsers);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <EmployeeTable preloadedEmployees={preloadedEmployees} />
    </div>
  );
}
