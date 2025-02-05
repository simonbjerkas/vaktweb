import GitHub from "@auth/core/providers/github";
import Resend from "@auth/core/providers/resend";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [GitHub, Resend],
  callbacks: {
    async createOrUpdateUser(ctx, { existingUserId, profile }) {
      if (existingUserId) return existingUserId;
      return await ctx.db.insert("users", {
        email: profile.email,
        name: profile.name,
        image: profile.image,
        emailVerificationTime: profile.emailVerificationTime,
        phone: profile.phone,
        phoneVerificationTime: profile.phoneVerificationTime,
        address: profile.address,
        city: profile.city,
        zip: profile.zip,
        dob: profile.dob,
        role: "new",
      });
    },
  },
});
