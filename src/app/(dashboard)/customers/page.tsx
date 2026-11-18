"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { customers, formatMoney, type Customer, type CustomerStatus } from "@/lib/data";

type SortKey = "name" | "mrr" | "joined";
type SortDir = "asc" | "desc";

const statusBadge: Record<CustomerStatus, "success" | "warning" | "destructive" | "secondary"> = {
  active: "success",
  trialing: "secondary",
  past_due: "warning",
  canceled: "destructive",
};

const statusLabel: Record<CustomerStatus, string> = {
  active: "Active",
  trialing: "Trialing",
  past_due: "Past due",
  canceled: "Canceled",
};

const statusOptions: Array<"all" | CustomerStatus> = [
  "all",
  "active",
  "trialing",
  "past_due",
  "canceled",
];

function SortButton({
  label,
  sortKey,
  sort,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  sort: { key: SortKey; dir: SortDir };
  onSort: (key: SortKey) => void;
}) {
  const active = sort.key === sortKey;
  const Icon = active
    ? sort.dir === "asc"
      ? ArrowUp
      : ArrowDown
    : ArrowUpDown;
  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground"
    >
      {label}
      <Icon className="h-3.5 w-3.5" aria-hidden />
      <span className="sr-only">
        {active
          ? `Sorted ${sort.dir === "asc" ? "ascending" : "descending"}`
          : "Sort"}
      </span>
    </button>
  );
}

export default function CustomersPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | CustomerStatus>("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({
    key: "name",
    dir: "asc",
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = customers.filter((c) => {
      const matchesQuery =
        q.length === 0 ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q);
      const matchesStatus = status === "all" || c.status === status;
      return matchesQuery && matchesStatus;
    });
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      if (sort.key === "mrr") return (a.mrr - b.mrr) * dir;
      if (sort.key === "joined") return a.joined.localeCompare(b.joined) * dir;
      return a.name.localeCompare(b.name) * dir;
    });
  }, [query, status, sort]);

  const onSort = (key: SortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {customers.length} mock customers. Search,
            filter by status, or sort a column.
          </p>
        </div>
        <Link
          href="/customers/new"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          Add customer
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All customers</CardTitle>
          <CardDescription>
            Sorting and filtering run in the browser over the mock data in
            src/lib/data.ts. There is no backend.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              type="search"
              placeholder="Search name, email, or company"
              aria-label="Search customers"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="sm:max-w-xs"
            />
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter by status"
            >
              {statusOptions.map((option) => (
                <Button
                  key={option}
                  variant={status === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatus(option)}
                  aria-pressed={status === option}
                >
                  {option === "all" ? "All" : statusLabel[option]}
                </Button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No customers match that search. Clear the search or pick a
              different status.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <SortButton
                      label="Customer"
                      sortKey="name"
                      sort={sort}
                      onSort={onSort}
                    />
                  </TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <SortButton
                      label="MRR"
                      sortKey="mrr"
                      sort={sort}
                      onSort={onSort}
                    />
                  </TableHead>
                  <TableHead>
                    <SortButton
                      label="Joined"
                      sortKey="joined"
                      sort={sort}
                      onSort={onSort}
                    />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c: Customer) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <span className="block font-medium">{c.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {c.email}
                      </span>
                    </TableCell>
                    <TableCell>{c.company}</TableCell>
                    <TableCell>{c.plan}</TableCell>
                    <TableCell>
                      <Badge variant={statusBadge[c.status]}>
                        {statusLabel[c.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatMoney(c.mrr)}</TableCell>
                    <TableCell>{c.joined}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
