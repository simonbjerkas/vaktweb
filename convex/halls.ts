import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllHalls = query({
  handler: async (ctx) => {
    return ctx.db.query("halls").collect();
  },
});

export const createHall = mutation({
  args: {
    name: v.string(),
    location: v.id("locations"),
    capacity: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("halls", args);
  },
});
