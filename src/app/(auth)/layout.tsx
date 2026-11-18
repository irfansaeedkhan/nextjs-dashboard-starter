import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="mb-6 text-sm font-bold tracking-tight">
        Dashboard Starter
      </Link>
      {children}
      <p className="mt-6 max-w-sm text-center text-xs leading-relaxed text-muted-foreground">
        Demo screens only. There is no real auth here: no account is
        created, no password is checked, and nothing is sent to a server.
      </p>
    </div>
  );
}
