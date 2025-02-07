import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

export { default as Loading } from "./loading";

export const Latest = () => {
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
