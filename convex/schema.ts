import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    zip: v.optional(v.number()),
    dob: v.optional(v.string()),
    locations: v.optional(v.array(v.id("locations"))),
    last_login: v.string(),
    role: v.union(
      v.literal("admin"),
      v.literal("moderator"),
      v.literal("user"),
      v.literal("new"),
    ),
  })
    .index("email", ["email"])
    .index("phone", ["phone"])
    .searchIndex("search_users", {
      searchField: "name",
    }),
  new_users: defineTable({
    email: v.string(),
  }).index("by_email", ["email"]),
  locations: defineTable({
    name: v.string(),
    address: v.string(),
    city: v.string(),
    zip: v.string(),
  }),
  halls: defineTable({
    name: v.string(),
    location: v.id("locations"),
    capacity: v.number(),
  }),
  shifts: defineTable({
    employee: v.id("users"),
    location: v.id("locations"),
    role: v.union(v.literal("leader"), v.literal("host")),
    day: v.string(),
    start: v.string(),
    end: v.string(),
    note: v.optional(v.string()),
  }).index("by_day", ["day"]),
  comment: defineTable({
    author: v.id("users"),
    body: v.string(),
    parent: v.optional(v.union(v.id("comment"), v.id("news"), v.id("reports"))),
    children: v.array(v.id("comment")),
  }),
  tags: defineTable({
    name: v.string(),
    type: v.union(v.literal("report"), v.literal("news"), v.literal("all")),
  })
    .index("by_name", ["name"])
    .index("by_type", ["type"]),
  news: defineTable({
    author: v.id("users"),
    locations: v.array(v.id("locations")),
    tags: v.optional(v.array(v.id("tags"))),
    title: v.string(),
    body: v.string(),
    comment: v.array(v.id("comment")),
  }),
  reports: defineTable({
    author: v.id("users"),
    locations: v.array(v.id("locations")),
    hall: v.id("halls"),
    tags: v.optional(v.array(v.id("tags"))),
    body: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
    ),
    comment: v.array(v.id("comment")),
  }),
  films: defineTable({
    title: v.string(),
    length: v.number(),
    pg_rating: v.number(),
  }),
  screenings: defineTable({
    film: v.id("films"),
    hall: v.id("halls"),
    date: v.string(),
    start_time: v.string(),
    end_time: v.string(),
    type: v.union(v.literal("2D"), v.literal("3D")),
    sold_seats: v.number(),
  }),
  notifications: defineTable({
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
  })
    .index("by_read", ["read"])
    .index("by_recipient", ["recipient"])
    .index("by_recipient_and_read", ["recipient", "read"]),
});
