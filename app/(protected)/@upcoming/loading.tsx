import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const calendarGrid = Array.from({ length: 6 }, () =>
  Array.from({ length: 7 }, (_, j) => j),
);

const Loading = () => {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Upcoming</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between mb-4">
          <Skeleton className="h-8 w-44" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
        {calendarGrid.map((row, i) => (
          <div key={i} className="flex gap-2">
            {row.map((col, j) => (
              <Skeleton key={j} className="h-20 w-full" />
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Loading;
