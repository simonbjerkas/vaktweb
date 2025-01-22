import { v } from "convex/values";
import { query } from "./_generated/server";

export const getHallsByLocation = query({
  args: { locationId: v.id("locations") },
  handler: async (ctx, { locationId }) => {
    return ctx.db
      .query("halls")
      .filter((q) => q.eq(q.field("location"), locationId))
      .collect();
  },
});

export const getAllHalls = query({
  handler: async (ctx) => {
    return ctx.db.query("halls").collect();
  },
});
