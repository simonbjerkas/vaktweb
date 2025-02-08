import { query } from "./_generated/server";
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
