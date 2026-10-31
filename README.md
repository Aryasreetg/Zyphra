This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact form, admin panel & database

- Visitors send queries through the **Contact** section on the homepage. Each one is saved to Postgres.
- The admin panel is at **`/admin`**. Log in with `ADMIN_PASSWORD` to view and reply to enquiries, track their status, convert them into students, manage students and fees, and export CSVs.
- Tables are created automatically the first time the app talks to the database (reference SQL: `db/schema.sql`).

### Deploying on Netlify

1. In the Netlify dashboard, open the site → **Data & storage → Database** and create a database.
   The app connects to it automatically through `@netlify/database` — no variable to copy.
   (Or use any Postgres — Neon, Supabase — and set `DATABASE_URL` yourself.)
2. **Site configuration → Environment variables** → add `ADMIN_PASSWORD` (a long, unique password).
3. Push to the branch Netlify deploys from. Netlify runs the contact form and admin pages as serverless functions automatically.

### Running locally

```bash
cp .env.example .env.local   # fill in DATABASE_URL and ADMIN_PASSWORD
npm run dev                  # site: http://localhost:3000, admin: http://localhost:3000/admin
```
