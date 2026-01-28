# QuantifyAI – BOQ Validation & Automated Budgeting

Modern B2B SaaS marketing site, waitlist, and MVP demo for construction BOQ validation.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui components
- Prisma ORM + Postgres (Neon-friendly)
- NextAuth (email magic link + credentials fallback)
- Zod + React Hook Form

## Getting started

```bash
npm install
cp .env.example .env
```

Run migrations and seed:

```bash
npm run prisma:migrate
npm run seed
```

Start dev server:

```bash
npm run dev
```

## Project structure

- Marketing pages: `src/app/(marketing)`
- App (authenticated): `src/app/(app)`
- Admin waitlist: `src/app/admin`
- API routes: `src/app/api`
- Prisma schema + seed: `prisma`

## Auth

NextAuth powers authentication with magic link email and a credentials fallback.

- Magic link logs to console in dev if `EMAIL_SERVER` is not set.
- Credentials login uses the seeded admin user.

Seeded admin:

- Email: `directors@quantifyai.uk`
- Password: `Admin123!`

## File uploads

Uploads are handled via server actions and stored in Cloudflare R2 (S3-compatible)
when `R2_*` env vars are set. If they are missing, the app falls back to local
storage in `./uploads`.

## Database

Postgres is required for production (Neon-friendly).

## Prisma & migrations

Postgres is configured by default. To migrate locally:

```bash
npm run prisma:migrate
```

For production deploys:

```bash
npm run prisma:deploy
```

To open Prisma Studio:

```bash
npm run prisma:studio
```

### Switch to another Postgres provider

1. Update `DATABASE_URL` in `.env`.
2. Run:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Create a new Vercel project.
3. Set env vars from `.env.example` (including R2 + email).
4. Run migrations on deploy (use Vercel build command or a post-deploy step).

## Email provider for contact + auth

Contact submissions are stored in the database and logged to the console.
To send email:

1. Add an SMTP provider.
2. Set `EMAIL_SERVER` and `EMAIL_FROM` in `.env`.
3. Replace console logs in `src/app/api/contact/route.ts`.
