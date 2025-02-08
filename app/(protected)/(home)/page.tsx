import { Suspense } from "react";
import {
  Latest,
  Loading as LatestLoading,
} from "@/app/(protected)/(home)/_latest";
import {
  Weekly,
  Loading as WeeklyLoading,
} from "@/app/(protected)/(home)/_weekly";
import {
  Upcoming,
  Loading as UpcomingLoading,
} from "@/app/(protected)/(home)/_upcoming";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col md:flex-row lg:flex-col gap-4">
        <div className="flex-1">
          <Suspense fallback={<LatestLoading />}>
            <Latest />
          </Suspense>
        </div>
        <div className="flex-1">
          <Suspense fallback={<WeeklyLoading />}>
            <Weekly />
          </Suspense>
        </div>
      </div>
      <div className="col-span-2 lg:col-span-1 lg:row-span-2">
        <Suspense fallback={<UpcomingLoading />}>
          <Upcoming />
        </Suspense>
      </div>
      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to the app</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Should use parallel routes for the different news if it make
              sense.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
