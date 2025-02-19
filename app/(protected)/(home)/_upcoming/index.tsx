import { EventCalendar } from "@/components/event-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export { default as Loading } from "./loading";

export const Upcoming = async () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Upcoming</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <EventCalendar events={[]} />
      </CardContent>
    </Card>
  );
};
