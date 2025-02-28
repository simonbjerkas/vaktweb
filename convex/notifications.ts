import { v } from "convex/values";
import { action, internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

export const cleanupNotificationsAction = action({
  args: {},
  handler: async (ctx) => {
    await ctx.runMutation(internal.notifications.cleanupNotifications);
  },
});

export const cleanupNotifications = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = new Date();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    const ninetyDays = 90 * 24 * 60 * 60 * 1000;

    const [readNotifications, unreadNotifications] = await Promise.all([
      ctx.db
        .query("notifications")
        .withIndex("by_read", (q) => q.eq("read", true))
        .filter((q) =>
          q.lt(q.field("_creationTime"), now.getTime() - thirtyDays),
        )
        .collect(),
      ctx.db
        .query("notifications")
        .withIndex("by_read", (q) => q.eq("read", false))
        .filter((q) =>
          q.lt(q.field("_creationTime"), now.getTime() - ninetyDays),
        )
        .collect(),
    ]);

    await Promise.all(
      readNotifications.map((notification) => ctx.db.delete(notification._id)),
    );
    await Promise.all(
      unreadNotifications.map((notification) =>
        ctx.db.delete(notification._id),
      ),
    );
  },
});

export const createNotification = internalMutation({
  args: {
    recipient: v.id("users"),
    type: v.union(
      v.literal("shift_assigned"),
      v.literal("shift_removed"),
      v.literal("shift_changed"),
      v.literal("important_news"),
      v.literal("report_comment"),
      v.literal("report_status_changed"),
    ),
    read: v.boolean(),
    title: v.string(),
    message: v.string(),
    related_id: v.optional(
      v.union(v.id("shifts"), v.id("news"), v.id("reports")),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("notifications", {
      recipient: args.recipient,
      type: args.type,
      read: args.read,
      title: args.title,
      message: args.message,
      related_id: args.related_id,
    });
  },
});

export const getNotifications = query({
  args: {
    recipient: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notifications")
      .withIndex("by_recipient", (q) => q.eq("recipient", args.recipient))
      .collect();
  },
});

export const getUnreadNotifications = query({
  args: {
    recipient: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notifications")
      .withIndex("by_recipient_and_read", (q) =>
        q.eq("recipient", args.recipient).eq("read", false),
      )
      .collect();
  },
});

export const getNotificationsCount = query({
  args: {
    recipient: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notifications")
      .withIndex("by_recipient_and_read", (q) =>
        q.eq("recipient", args.recipient).eq("read", false),
      )
      .collect()
      .then((notifications) => notifications.length);
  },
});
