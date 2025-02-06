"use client";

import { ColDef } from "ag-grid-community";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useMemo } from "react";
import { differenceInMinutes } from "date-fns";
import { AgTable } from "@/components/ag-table";
type RowData = {
  name: string;
  role: "leader" | "host";
  start: string;
  end: string;
  hours: number;
  location: string;
  note?: string;
};

export const ShiftTable = ({
  preloadedShifts,
}: {
  preloadedShifts: Preloaded<typeof api.shifts.getShiftsByDay>;
}) => {
  const shifts = usePreloadedQuery(preloadedShifts);

  const rowData = useMemo(() => {
    return shifts.map((shift) => ({
      ...shift,
      start: new Date(shift.start).toLocaleTimeString("no-NO", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      end: new Date(shift.end).toLocaleTimeString("no-NO", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      hours:
        differenceInMinutes(new Date(shift.end), new Date(shift.start)) / 60,
    }));
  }, [shifts]);

  const colDefs: ColDef<RowData>[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "start", headerName: "Start", flex: 1 },
    { field: "end", headerName: "End", flex: 1 },
    { field: "hours", headerName: "Hours", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "note", headerName: "Note", flex: 2 },
  ];

  return <AgTable rowData={rowData} colDefs={colDefs} />;
};
