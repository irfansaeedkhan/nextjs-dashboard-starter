"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  LogIn,
  UserRoundPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/customers/new", label: "New customer", icon: UserPlus },
  { href: "/sign-in", label: "Sign in", icon: LogIn },
  { href: "/sign-up", label: "Sign up", icon: UserRoundPlus },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r bg-card md:flex">
      <div className="flex h-14 items-center border-b px-5">
        <Link href="/" className="text-sm font-bold tracking-tight">
          Dashboard Starter
        </Link>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {nav.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4">
        <p className="rounded-md bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
          Demo data only. Nothing here is saved or sent anywhere.
        </p>
      </div>
    </aside>
  );
}
