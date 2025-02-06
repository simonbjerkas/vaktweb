import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

const Latest = () => {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Welcome to the app</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Things that is important today and the next days</p>
      </CardContent>
    </Card>
  );
};

export default Latest;
