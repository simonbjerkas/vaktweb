import { EventCalendar } from "@/components/event-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export { default as Loading } from "./loading";

export const Upcoming = async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming</CardTitle>
      </CardHeader>
      <CardContent>
        <EventCalendar events={[]} />
      </CardContent>
    </Card>
  );
};
