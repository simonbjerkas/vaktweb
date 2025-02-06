import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
const Weekly = () => {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Weekly</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>Upcoming movies</p>
        <Separator />
        <p>Last day</p>
      </CardContent>
    </Card>
  );
};

export default Weekly;
