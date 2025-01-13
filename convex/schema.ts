import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.string(),
    image: v.optional(v.string()),
    email: v.string(),
    phone: v.string(),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    zip: v.optional(v.string()),
    dob: v.optional(v.string()),
    role: v.union(
      v.literal("admin"),
      v.literal("moderator"),
      v.literal("user"),
    ),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),
  centers: defineTable({
    name: v.string(),
    address: v.string(),
    city: v.string(),
    zip: v.string(),
  }),
  halls: defineTable({
    name: v.string(),
    center: v.id("centers"),
    capacity: v.number(),
  }),
  shifts: defineTable({
    employee: v.id("users"),
    center: v.id("centers"),
    date: v.string(),
    start_time: v.string(),
    end_time: v.string(),
    note: v.optional(v.string()),
  }),
  comment: defineTable({
    author: v.id("users"),
    body: v.string(),
    parent: v.optional(v.union(v.id("comment"), v.id("news"), v.id("reports"))),
    children: v.array(v.id("comment")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  news: defineTable({
    author: v.id("users"),
    centers: v.array(v.id("centers")),
    createdAt: v.number(),
    updatedAt: v.number(),
    title: v.string(),
    body: v.string(),
    comment: v.array(v.id("comment")),
  }),
  reports: defineTable({
    author: v.id("users"),
    centers: v.array(v.id("centers")),
    createdAt: v.number(),
    updatedAt: v.number(),
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
});
