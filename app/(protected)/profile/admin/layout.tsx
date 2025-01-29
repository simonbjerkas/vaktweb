import ConvexClientProvider from "@/components/convex-client-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
