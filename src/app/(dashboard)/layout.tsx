import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title="Dashboard" />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
        <footer className="border-t px-4 py-3 text-xs text-muted-foreground sm:px-6">
          Next.js Dashboard Starter. MIT licensed. Mock data only.
        </footer>
      </div>
    </div>
  );
}
