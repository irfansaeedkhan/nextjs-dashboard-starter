# Next.js Dashboard Starter

A free, MIT-licensed dashboard starter for Next.js 16. It gives you a
working admin dashboard on day one: a sidebar layout, an overview page
with stat cards, a sortable and filterable data table, a validated form,
and sign-in and sign-up screens. All data is mock data in one file.
There is no backend, no database, and no real auth. Swap the mock data
for your own API when you are ready.

## What is inside

- Next.js 16 with the App Router, React 19, and TypeScript
- Tailwind CSS 4 with a shadcn-style theme (light and dark tokens in
  `src/app/globals.css`)
- UI primitives in `src/components/ui`: Button, Card, Badge, Input
  (with Label), and Table
- Dashboard layout with a sidebar and a topbar
  (`src/components/layout`)
- Overview page (`/`): stat cards, monthly revenue bars drawn with
  plain CSS, and a recent orders table
- Customers page (`/customers`): search, status filter, and sorting by
  name, MRR, and joined date, over mock data
- New customer form (`/customers/new`): client-side validation with
  inline errors, mock only
- Sign-in (`/sign-in`) and sign-up (`/sign-up`) screens: mock only, no
  account is created and nothing is sent anywhere
- Mock data in `src/lib/data.ts`: 12 customers, 8 orders, monthly
  revenue, and dashboard stats

## Get started

You need Node.js 20 or later and npm.

```bash
git clone https://github.com/irfansaeedkhan/nextjs-dashboard-starter.git
cd nextjs-dashboard-starter
npm install
npm run dev
```

Open http://localhost:3000. The overview page is the dashboard. Use
the sidebar to open Customers, the new customer form, and the auth
screens.

## Commands

```bash
npm run dev        # start the dev server
npm run build      # production build
npm start          # run the production build
npm run lint       # run ESLint
npm run typecheck  # run tsc with no emit
```

## Project structure

```text
src/
  app/
    layout.tsx                 # root layout and metadata
    globals.css                # Tailwind theme tokens
    (dashboard)/
      layout.tsx               # sidebar + topbar shell
      page.tsx                 # overview: stat cards and orders
      customers/
        page.tsx               # sortable, filterable table
        new/page.tsx           # validated new customer form
    (auth)/
      layout.tsx               # centered auth shell
      sign-in/page.tsx         # mock sign-in screen
      sign-up/page.tsx         # mock sign-up screen
  components/
    layout/
      sidebar.tsx              # sidebar navigation
      topbar.tsx               # topbar with search and avatar
    ui/
      badge.tsx  button.tsx  card.tsx  input.tsx  table.tsx
  lib/
    data.ts                    # mock customers, orders, revenue, stats
    utils.ts                   # cn() class merge helper
```

Route groups in parentheses, `(dashboard)` and `(auth)`, share a
layout without adding a segment to the URL. That is how the dashboard
pages get the sidebar while the auth screens get a centered layout.

## How to customize

- **Your data:** replace the arrays in `src/lib/data.ts` with a fetch
  call to your API, or pass real rows into the same table and card
  components. Keep the types in that file and the pages keep working.
- **Your brand:** change the color tokens in `src/app/globals.css`
  under `:root` and `.dark`, and the name in
  `src/components/layout/sidebar.tsx`.
- **Your auth:** the sign-in and sign-up pages say where the real
  request goes. Replace the mock submit handler with your auth
  provider call. Do not ship the mock screens as real auth.
- **More pages:** copy `src/app/(dashboard)/customers/page.tsx` as a
  starting point. Add a link in
  `src/components/layout/sidebar.tsx` and the page appears in the
  sidebar.
- **Charts:** the overview draws monthly revenue with plain CSS bars
  on purpose, so the starter has no chart dependency. Add your chart
  library of choice when you need real charts.

## Who built this

Built by Irfan Saeed Khan, a frontend engineer who builds dashboards
and SaaS frontends on Next.js. The starter is the same shape as the
dashboards in his client work. A teaching guide that walks through
this starter lives at
https://irfansaeedkhan.dev/guides/nextjs-dashboard-starter.

A dashboard or SaaS frontend built from this shape starts at $2,800
and takes 4 to 6 weeks. See
https://irfansaeedkhan.dev/guides/how-much-does-a-dashboard-cost for
the price bands behind that number.

## License

MIT. Use it in commercial projects, change it, and ship it. See
[LICENSE](LICENSE).
