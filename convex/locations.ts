import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getLocations = query({
  args: {},
  handler: async (ctx) => {
    const locations = await ctx.db.query("locations").collect();
    return locations.map((location) => ({
      id: location._id,
      name: location.name,
    }));
  },
});

export const createLocation = mutation({
  args: {
    name: v.string(),
    address: v.string(),
    city: v.string(),
    zip: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("locations", args);
  },
});
