import { editorContentStyle } from "@/components/text-editor";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import sanitize from "sanitize-html";

export function ReportCard({
  report,
}: {
  report: Omit<Doc<"reports">, "locations" | "author"> & {
    author: string | undefined;
    locations: (string | undefined)[];
  };
}) {
  const sanitizedBody = sanitize(report.body, {
    allowedAttributes: {},
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>{report.author}</CardTitle>
        <CardDescription>{report.locations}</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={editorContentStyle}
          dangerouslySetInnerHTML={{ __html: sanitizedBody }}
        />
      </CardContent>
      <CardFooter>test</CardFooter>
    </Card>
  );
}
