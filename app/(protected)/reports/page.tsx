"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ReportCard } from "./report-card";
import { Button } from "@/components/ui/button";
import NewReportForm from "./new-report-form";

export default function Reports() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.reports.getReports,
    {},
    { initialNumItems: 10 },
  );
  return (
    <>
      <nav>
        <NewReportForm />
      </nav>
      <div className="flex flex-col gap-4">
        {results?.map((report) => (
          <ReportCard key={report._id} report={report} />
        ))}
      </div>
      <Button
        className="w-full"
        onClick={() => loadMore(10)}
        disabled={status !== "CanLoadMore"}
      >
        Load more
      </Button>
    </>
  );
}
