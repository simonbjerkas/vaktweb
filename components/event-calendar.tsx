"use client";

import { useMemo, useCallback, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  addMonths,
} from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Id } from "@/convex/_generated/dataModel";

type Event = {
  id: string;
  start: Date;
  end: Date;
  summary: string;
  description: string;
  location: Id<"locations">;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export function EventCalendar({ events }: { events: Event[] }) {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));

    const days = eachDayOfInterval({ start, end });

    const weeks: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  }, [currentMonth]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, Event[]>();

    events.forEach((event) => {
      const dateKey = format(event.start, "yyyy-MM-dd");
      const existing = map.get(dateKey) || [];
      map.set(dateKey, [...existing, event]);
    });

    return map;
  }, [events]);

  const getEventsForDate = useCallback(
    (date: Date) => {
      return eventsByDate.get(format(date, "yyyy-MM-dd")) || [];
    },
    [eventsByDate],
  );

  const handlePreviousMonth = useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, -1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  }, []);

  const handleToday = useCallback(() => {
    setCurrentMonth(new Date());
  }, []);

  const currentMonthString = useMemo(() => {
    return format(currentMonth, "MMMM yyyy");
  }, [currentMonth]);

  return (
    <div className="w-full space-y-4">
      {/* Calendar Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-lg font-semibold">{currentMonthString}</h2>
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePreviousMonth}
            variant="outline"
            size="sm"
            className="w-24"
          >
            Previous
          </Button>
          <Button
            onClick={handleToday}
            variant="outline"
            size="sm"
            className="w-24"
          >
            Today
          </Button>
          <Button
            onClick={handleNextMonth}
            variant="outline"
            size="sm"
            className="w-24"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Calendar Table */}
      <table className="w-full border-collapse table-fixed text-xs">
        <thead>
          <tr>
            {WEEKDAYS.map((day) => (
              <th key={day} className="px-2 py-3 text-sm border">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarDays.map((week, weekIndex) => (
            <tr key={weekIndex} className="h-16">
              {week.map((day) => {
                const dayEvents = getEventsForDate(day);
                return (
                  <td
                    key={day.toString()}
                    className={cn(
                      "p-1 border align-top cursor-pointer transition-colors hover:bg-accent/50 relative",
                      !isSameMonth(day, currentMonth) &&
                        "text-muted-foreground bg-muted/40",
                      isToday(day) && "bg-accent",
                    )}
                  >
                    <span className="inline-block mb-0.5">
                      {format(day, "d")}
                    </span>
                    <div className="flex flex-col gap-1">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className="rounded-sm px-1 bg-rose-600 text-secondary-foreground truncate"
                          title={event.summary}
                        >
                          {event.summary}
                        </div>
                      ))}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
