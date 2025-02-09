import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import { api } from "./_generated/api";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [GitHub, Google],
  callbacks: {
    async createOrUpdateUser(ctx, { existingUserId, profile }) {
      if (existingUserId) return existingUserId;

      const allowedEmail = await ctx.runQuery(api.new_user.getNewUser, {
        email: profile.email,
      });
      if (!allowedEmail) throw new ConvexError("Email not allowed");

      const userId = await ctx.db.insert("users", {
        email: profile.email,
        name: profile.name,
        image: profile.image,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        zip: profile.zip,
        dob: profile.dob,
        role: "new",
      });
      await ctx.db.delete(allowedEmail._id);
      return userId;
    },
  },
});
