import Link from "next/link";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMoney, orders, revenueByMonth, stats } from "@/lib/data";

function StatCard({
  label,
  value,
  change,
  note,
}: {
  label: string;
  value: string;
  change: number;
  note: string;
}) {
  const up = change >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon
            className={
              up ? "h-3.5 w-3.5 text-emerald-600" : "h-3.5 w-3.5 text-red-600"
            }
            aria-hidden
          />
          <span className={up ? "text-emerald-600" : "text-red-600"}>
            {up ? "+" : ""}
            {change}%
          </span>
          {note}
        </p>
      </CardContent>
    </Card>
  );
}

const orderBadge: Record<string, "success" | "warning" | "destructive"> = {
  paid: "success",
  pending: "warning",
  refunded: "destructive",
};

export default function OverviewPage() {
  const maxRevenue = Math.max(...revenueByMonth.map((r) => r.revenue));
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
          <p className="text-sm text-muted-foreground">
            Your business at a glance. All figures are mock data.
          </p>
        </div>
        <Link
          href="/customers/new"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          Add customer
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Monthly recurring revenue"
          value={formatMoney(stats.mrr)}
          change={stats.mrrChange}
          note="vs last month"
        />
        <StatCard
          label="Active customers"
          value={String(stats.activeCustomers)}
          change={stats.customersChange}
          note="vs last month"
        />
        <StatCard
          label="Orders this month"
          value={String(stats.ordersThisMonth)}
          change={stats.ordersChange}
          note="vs last month"
        />
        <StatCard
          label="Churn rate"
          value={`${stats.churnRate}%`}
          change={stats.churnChange}
          note="vs last month"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue by month</CardTitle>
            <CardDescription>
              Six months of mock revenue, drawn with plain CSS bars. No
              chart library.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-40 items-end gap-3">
              {revenueByMonth.map((row) => (
                <div
                  key={row.month}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <span className="text-xs font-medium">
                    {formatMoney(row.revenue)}
                  </span>
                  <div
                    className="w-full max-w-10 rounded-t bg-primary"
                    style={{
                      height: `${Math.round(
                        (row.revenue / maxRevenue) * 100,
                      )}%`,
                    }}
                    role="img"
                    aria-label={`${row.month} revenue ${formatMoney(row.revenue)}`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {row.month}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
            <CardDescription>
              The five latest orders from the mock data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell className="text-right">
                      {formatMoney(order.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={orderBadge[order.status]}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="mt-4 text-sm">
              <Link
                href="/customers"
                className="font-medium text-primary underline underline-offset-4"
              >
                See all customers
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
