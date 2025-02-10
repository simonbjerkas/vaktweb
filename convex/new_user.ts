import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getNewUser = query({
  args: {
    email: v.optional(v.string()),
  },
  handler: async (ctx, { email }) => {
    if (!email) {
      return null;
    }
    const user = await ctx.db
      .query("new_users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();
    if (user) {
      return user;
    }
  },
});

export const addNewUser = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, { email }) => {
    return await ctx.db.insert("new_users", {
      email,
    });
  },
});
