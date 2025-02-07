"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { usePostHog } from "posthog-js/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function PostHogPageView(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  const user = useQuery(api.users.posthogUser);

  useEffect(() => {
    if (user) {
      posthog.identify(user._id);
    } else {
      posthog.reset();
    }
  }, [user, posthog]);

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }

      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

// Wrap this in Suspense to avoid the `useSearchParams` usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
export default function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
