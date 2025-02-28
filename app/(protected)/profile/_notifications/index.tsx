"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const Notifications = ({ userId }: { userId: Id<"users"> }) => {
  const notifications = useQuery(api.notifications.getNotifications, {
    recipient: userId,
  });
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {notifications?.map((notification) => (
            <div key={notification._id}>
              <h2 className="text-lg font-bold">{notification.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
