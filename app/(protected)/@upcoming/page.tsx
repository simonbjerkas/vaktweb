import { EventCalendar } from "@/components/event-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Upcoming = async () => {
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

export default Upcoming;
