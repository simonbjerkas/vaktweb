import { EventCalendar } from "@/components/event-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Upcoming = async () => {
  const upcoming = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("upcoming");
    }, 2000);
  });
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
