import ConvexClientProvider from "@/components/convex-client-provider";

export default function UpdateUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
