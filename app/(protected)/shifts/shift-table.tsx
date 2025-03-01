"use client";

import { api } from "@/convex/_generated/api";
import { usePreloadedQuery, Preloaded } from "convex/react";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { differenceInMinutes, format } from "date-fns";
export const ShiftTable = ({
  preloadedShifts,
}: {
  preloadedShifts: Preloaded<typeof api.shifts.getShiftsByDay>;
}) => {
  const shifts = usePreloadedQuery(preloadedShifts);
  const data = shifts.map((shift) => ({
    ...shift,
    start: format(new Date(shift.start), "HH:mm"),
    end: format(new Date(shift.end), "HH:mm"),
    hours: differenceInMinutes(new Date(shift.end), new Date(shift.start)) / 60,
  }));
  return <DataTable columns={columns} data={data} />;
};
