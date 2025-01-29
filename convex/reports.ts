import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { paginationOptsValidator } from "convex/server";
import { filter } from "convex-helpers/server/filter";

import sanitize from "sanitize-html";

export const createReport = mutation({
  args: {
    locationId: v.id("locations"),
    hallId: v.id("halls"),
    tags: v.optional(v.array(v.id("tags"))),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getAuthUserId(ctx);
    if (!user) throw new Error("Unauthorized");

    const sanitizedBody = sanitize(args.body, {
      allowedAttributes: {},
    });

    const reportId = await ctx.db.insert("reports", {
      author: user,
      locations: [args.locationId],
      hall: args.hallId,
      tags: args.tags,
      status: "pending",
      body: sanitizedBody,
      comment: [],
    });
    await ctx.db.insert("reports_locations", {
      report: reportId,
      location: args.locationId,
    });
  },
});

export const getReports = query({
  args: {
    paginationOpts: paginationOptsValidator,
    locationIds: v.optional(v.array(v.id("locations"))),
  },
  handler: async (ctx, { locationIds, paginationOpts }) => {
    const reports = await filter(ctx.db.query("reports"), (report) => {
      if (locationIds) {
        return report.locations.some((location) =>
          locationIds?.includes(location),
        );
      }
      return true;
    }).paginate(paginationOpts);

    const reportsWithAuthor = await Promise.all(
      reports.page.map(async (report) => {
        const [author, locations] = await Promise.all([
          ctx.db.get(report.author),
          await Promise.all(
            report.locations.map(
              async (location) => await ctx.db.get(location),
            ),
          ),
        ]);

        return {
          ...report,
          author: author?.name,
          locations: locations
            .map((location) => location?.name)
            .filter(Boolean),
        };
      }),
    );

    console.log(reportsWithAuthor);
    return {
      ...reports,
      page: reportsWithAuthor,
    };
  },
});
