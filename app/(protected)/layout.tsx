const links = [
  { href: "/", label: "Home" },
  { href: "/screenings", label: "Screenings" },
  { href: "/reports", label: "Reports" },
  { href: "/employees", label: "Employees" },
];

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header></header>
      <div>{children}</div>
      <footer></footer>
    </>
  );
}
