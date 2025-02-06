import { ShiftTable } from "./shift-table";
import { AddShiftForm } from "./add-shift-form";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ShiftTimeline } from "./shift-timeline";

export default async function ShiftsPage() {
  const preloadedShifts = await preloadQuery(api.shifts.getShiftsByDay, {
    day: new Date().toISOString(),
  });
  return (
    <div className="flex flex-col gap-4">
      <AddShiftForm />
      <ShiftTable preloadedShifts={preloadedShifts} />
      <ShiftTimeline preloadedShifts={preloadedShifts} />
    </div>
  );
}
