"use client";

import { useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import PostHogPageView from "./pageview-tracker";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "/ingest",
      ui_host: "https://eu.posthog.com",
      capture_pageview: false,
      person_profiles: "identified_only",
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
