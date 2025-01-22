import ConvexClientProvider from "@/components/convex-client-provider";

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
