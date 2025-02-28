import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { startOfDay } from "date-fns";

export const getShiftsByDay = query({
  args: {
    day: v.string(),
  },
  handler: async (ctx, { day }) => {
    const shifts = await ctx.db
      .query("shifts")
      .withIndex("by_day", (q) =>
        q.eq("day", startOfDay(new Date(day)).toString()),
      )
      .collect();

    return await Promise.all(
      shifts.map(async (shift) => {
        const [user, location] = await Promise.all([
          ctx.db.get(shift.employee),
          ctx.db.get(shift.location),
        ]);
        return {
          ...shift,
          name: user?.name ?? "",
          location: location?.name ?? "",
        };
      }),
    );
  },
});

export const createShift = mutation({
  args: {
    shift: v.object({
      employee: v.id("users"),
      location: v.id("locations"),
      role: v.union(v.literal("leader"), v.literal("host")),
      start: v.string(),
      end: v.string(),
      note: v.optional(v.string()),
    }),
  },
  handler: async (ctx, { shift }) => {
    await ctx.db.insert("shifts", {
      ...shift,
      day: startOfDay(new Date(shift.start)).toString(),
    });
    await ctx.scheduler.runAfter(0, internal.notifications.createNotification, {
      recipient: shift.employee,
      type: "shift_assigned",
      read: false,
      title: "Shift assigned",
      message: `You have been assigned a shift on ${shift.start.split("T")[0]} from ${shift.start.split("T")[1]} to ${shift.end.split("T")[1]}`,
    });
  },
});
