"use client";

import { ColDef } from "ag-grid-community";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { AgTable } from "@/components/ag-table";
import type { CustomCellRendererProps } from "ag-grid-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
type RowData = {
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

export const EmployeeTable = ({
  preloadedEmployees,
}: {
  preloadedEmployees: Preloaded<typeof api.users.getAllUsers>;
}) => {
  const employees = usePreloadedQuery(preloadedEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<RowData | null>(
    null,
  );

  const rowData = useMemo(() => {
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

  const colDefs: ColDef<RowData>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellRenderer: ImageNameCell,
      cellRendererParams: {
        image: "image",
      },
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1,
      cellRenderer: ContactCell,
    },
    { field: "dob", headerName: "Date of birth", flex: 1 },
    { field: "address", headerName: "Address", flex: 2 },
    { field: "locations", headerName: "Locations", flex: 1 },
    { field: "role", headerName: "Role", flex: 2 },
  ];

  return (
    <div className="clickable-table">
      <AgTable
        rowData={rowData}
        colDefs={colDefs}
        onRowClicked={(event) => {
          setSelectedEmployee(event.data);
        }}
      />

      <Dialog
        open={!!selectedEmployee}
        onOpenChange={() => setSelectedEmployee(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEmployee?.name}</DialogTitle>
            <DialogDescription className="flex gap-2">
              <span>{selectedEmployee?.contact.email}</span>
              {"|"}
              <span>{selectedEmployee?.contact.phone}</span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ImageNameCell = (props: CustomCellRendererProps) => {
  return (
    <div className="flex items-center gap-2">
      {props.data.image && (
        <img
          src={props.data.image}
          alt={props.data.name}
          className="size-8 rounded-full"
        />
      )}
      <span>{props.data.name}</span>
    </div>
  );
};

const ContactCell = (props: CustomCellRendererProps) => {
  return (
    <div className="flex items-center gap-2">
      <span>{props.data.contact.email}</span>
      <span>{props.data.contact.phone}</span>
    </div>
  );
};
