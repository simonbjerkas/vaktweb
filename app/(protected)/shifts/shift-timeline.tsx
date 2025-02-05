"use client";

import { Bar, BarChart, CartesianGrid } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";

const chartConfig = {
  start: {
    label: "Start",
    color: "#2563eb",
  },
  end: {
    label: "End",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function ShiftTimeline({
  preloadedShifts,
}: {
  preloadedShifts: Preloaded<typeof api.shifts.getShiftsByDay>;
}) {
  const shifts = usePreloadedQuery(preloadedShifts);

  const chartData = shifts.map((shift) => ({
    name: shift.employee,
    start: parseInt(
      new Date(shift.start).toLocaleTimeString("no-NO", {
        hour: "2-digit",
      }),
    ),
    end: parseInt(
      new Date(shift.end).toLocaleTimeString("no-NO", {
        hour: "2-digit",
      }),
    ),
  }));

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <Bar dataKey="start" fill="var(--color-start)" radius={4} />
        <Bar dataKey="end" fill="var(--color-end)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
