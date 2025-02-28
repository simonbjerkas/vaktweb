import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

crons.daily(
  "Notification cleanup",
  { hourUTC: 1, minuteUTC: 0 },
  api.notifications.cleanupNotificationsAction,
);

export default crons;
