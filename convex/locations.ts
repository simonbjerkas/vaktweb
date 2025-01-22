import { query } from "./_generated/server";

export const getLocations = query({
  args: {},
  handler: async (ctx) => {
    const locations = await ctx.db.query("locations").collect();
    return locations.map((location) => ({
      id: location._id,
      name: location.name,
    }));
  },
});
