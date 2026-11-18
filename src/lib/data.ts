export type CustomerStatus = "active" | "trialing" | "past_due" | "canceled";

export type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: "Starter" | "Growth" | "Scale";
  status: CustomerStatus;
  mrr: number;
  joined: string;
};

export type Order = {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "paid" | "pending" | "refunded";
  date: string;
};

export const customers: Customer[] = [
  { id: "cus_01", name: "Amelia Hart", email: "amelia@northwind.io", company: "Northwind", plan: "Growth", status: "active", mrr: 249, joined: "2026-09-12" },
  { id: "cus_02", name: "Jonas Weber", email: "jonas@feldman.dev", company: "Feldman", plan: "Scale", status: "active", mrr: 499, joined: "2026-08-03" },
  { id: "cus_03", name: "Priya Nair", email: "priya@loopwork.co", company: "Loopwork", plan: "Starter", status: "trialing", mrr: 0, joined: "2026-11-02" },
  { id: "cus_04", name: "Marco Ruiz", email: "marco@andeslabs.com", company: "Andes Labs", plan: "Growth", status: "past_due", mrr: 249, joined: "2026-07-21" },
  { id: "cus_05", name: "Sara Lindqvist", email: "sara@fjord.se", company: "Fjord", plan: "Starter", status: "active", mrr: 99, joined: "2026-10-18" },
  { id: "cus_06", name: "Tom Becker", email: "tom@beckerandco.de", company: "Becker & Co", plan: "Scale", status: "active", mrr: 499, joined: "2026-06-30" },
  { id: "cus_07", name: "Aiko Tanaka", email: "aiko@sakura.jp", company: "Sakura", plan: "Growth", status: "trialing", mrr: 0, joined: "2026-11-10" },
  { id: "cus_08", name: "Liam O'Connor", email: "liam@harbour.ie", company: "Harbour", plan: "Starter", status: "canceled", mrr: 0, joined: "2026-05-14" },
  { id: "cus_09", name: "Elena Petrova", email: "elena@volga.ru", company: "Volga", plan: "Growth", status: "active", mrr: 249, joined: "2026-09-27" },
  { id: "cus_10", name: "David Kim", email: "david@hanriver.kr", company: "Han River", plan: "Scale", status: "active", mrr: 499, joined: "2026-08-19" },
  { id: "cus_11", name: "Marta Silva", email: "marta@atlantic.pt", company: "Atlantic", plan: "Starter", status: "trialing", mrr: 0, joined: "2026-11-15" },
  { id: "cus_12", name: "Omar Haddad", email: "omar@cedar.ae", company: "Cedar", plan: "Growth", status: "past_due", mrr: 249, joined: "2026-07-08" },
];

export const orders: Order[] = [
  { id: "ord_1001", customer: "Northwind", product: "Growth plan, annual", amount: 2388, status: "paid", date: "2026-11-14" },
  { id: "ord_1002", customer: "Feldman", product: "Scale plan, monthly", amount: 499, status: "paid", date: "2026-11-13" },
  { id: "ord_1003", customer: "Andes Labs", product: "Growth plan, monthly", amount: 249, status: "pending", date: "2026-11-12" },
  { id: "ord_1004", customer: "Fjord", product: "Starter plan, annual", amount: 948, status: "paid", date: "2026-11-11" },
  { id: "ord_1005", customer: "Harbour", product: "Starter plan, monthly", amount: 99, status: "refunded", date: "2026-11-09" },
  { id: "ord_1006", customer: "Volga", product: "Growth plan, monthly", amount: 249, status: "paid", date: "2026-11-08" },
  { id: "ord_1007", customer: "Han River", product: "Scale plan, annual", amount: 4788, status: "paid", date: "2026-11-07" },
  { id: "ord_1008", customer: "Cedar", product: "Growth plan, monthly", amount: 249, status: "pending", date: "2026-11-06" },
];

export const revenueByMonth = [
  { month: "Jun", revenue: 4200 },
  { month: "Jul", revenue: 5100 },
  { month: "Aug", revenue: 4800 },
  { month: "Sep", revenue: 6300 },
  { month: "Oct", revenue: 7100 },
  { month: "Nov", revenue: 8400 },
];

export const stats = {
  mrr: 2843,
  mrrChange: 12.4,
  activeCustomers: 8,
  customersChange: 4.1,
  ordersThisMonth: 32,
  ordersChange: 8.7,
  churnRate: 2.1,
  churnChange: -0.4,
};

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
