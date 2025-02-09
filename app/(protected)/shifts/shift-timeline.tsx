"use client";

import { Bar, ComposedChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { format } from "date-fns";
const chartConfig = {
  shift: {
    label: "Shift",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function ShiftTimeline({
  preloadedShifts,
}: {
  preloadedShifts: Preloaded<typeof api.shifts.getShiftsByDay>;
}) {
  const shifts = usePreloadedQuery(preloadedShifts);

  const chartData = shifts.map((shift) => ({
    name: shift.name,
    shift: [
      parseInt(format(new Date(shift.start), "HH")),
      parseInt(format(new Date(shift.end), "HH")),
    ],
  }));

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ComposedChart layout="vertical" accessibilityLayer data={chartData}>
        <CartesianGrid />
        <XAxis
          type="number"
          domain={["dataMin", "dataMax"]}
          tickCount={12}
          tickFormatter={(value) => `${value > 24 ? value - 24 : value}:00`}
        />
        <YAxis
          type="category"
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.split(" ")[0]}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="shift" fill="var(--color-shift)" />
      </ComposedChart>
    </ChartContainer>
  );
}
