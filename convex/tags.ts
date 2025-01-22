import { v } from "convex/values";
import { query } from "./_generated/server";

export const getTagByType = query({
  args: {
    type: v.union(v.literal("report"), v.literal("news")),
  },
  handler: async (ctx, args) => {
    const tags = await ctx.db
      .query("tags")
      .filter((q) => q.eq(q.field("type"), args.type || "all"))
      .collect();

    return tags.map((tag) => tag.name);
  },
});
