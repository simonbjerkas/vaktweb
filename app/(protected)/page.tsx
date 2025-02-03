import { EventCalendar } from "@/components/event-calendar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { addDays, addHours } from "date-fns";
import { redirect } from "next/navigation";

// create a list of 10 events with different start and end
const start = new Date();
const end = addHours(start, 10);

const events = Array.from({ length: 10000 }, (_, index) => ({
  id: index.toString(),
  start: addDays(start, index),
  end: addDays(end, index),
  summary: `Event ${index}`,
  description: `Description for Event ${index}`,
  location: "123 Main St, Anytown, USA" as Id<"locations">,
}));

export default async function Home() {
  const user = await fetchQuery(
    api.users.viewer,
    {},
    { token: await convexAuthNextjsToken() },
  );

  if (user.role === "new") redirect("/profile/update");
  return (
    <>
      <div>
        <EventCalendar events={events} />
      </div>
      <p>Should use parallel routes for the different news if it make sense.</p>
    </>
  );
}
