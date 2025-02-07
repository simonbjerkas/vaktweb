import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Welcome to the app</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5" />
      </CardContent>
    </Card>
  );
};

export default Loading;
