import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { filter } from "convex-helpers/server/filter";

export const posthogUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    const user = await ctx.db.get(userId);
    if (user === null) return null;
    return user;
  },
});

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not signed in");
    }
    const user = await ctx.db.get(userId);
    if (user === null) {
      throw new Error("User was deleted");
    }
    return user;
  },
});

export const updateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    city: v.string(),
    zip: v.number(),
    dob: v.string(),
  },
  handler: async (ctx, { name, email, phone, address, city, zip, dob }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not signed in");
    }
    const user = await ctx.db.get(userId);
    if (user === null) {
      throw new Error("User not found");
    }

    return ctx.db.patch(userId, {
      name: name,
      email: email,
      phone: phone,
      address: address,
      city: city,
      zip: zip,
      dob: dob,
      role: user.role === "new" ? "user" : user.role,
    });
  },
});

export const getUsersByLocation = query({
  args: {
    locationId: v.optional(v.id("locations")),
  },
  handler: async (ctx, { locationId }) => {
    if (locationId) {
      return await filter(
        ctx.db.query("users"),
        (user) => user.locations?.includes(locationId) ?? false,
      ).collect();
    }
  },
});

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return Promise.all(
      users.map(async (user) => ({
        ...user,
        locations: await Promise.all(
          user.locations?.map(async (locationId) => {
            const location = await ctx.db.get(locationId);
            return location?.name;
          }) ?? [],
        ),
      })),
    );
  },
});
