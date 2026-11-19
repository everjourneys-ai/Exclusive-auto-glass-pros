# Exclusive Auto Glass Pros: Web App

This is the lead-generation web app for **Exclusive Auto Glass Pros**, a shop-based auto glass business in Westlake Village, CA. It's built for paid ad traffic, and its job is to turn visitors into **calls and texts** first, with quote-form leads and email as secondary options.

| | |
|---|---|
| Live site | https://exclusiveautoglasspros.com |
| Address | 755 Lakefield Rd. Unit I, Westlake Village, CA 91361 |
| Phone | (805) 917-2036 |
| Stack | Next.js 16 (React 19, TypeScript) on Vercel · Supabase (leads) · Resend (lead alerts) |
| Architecture | [`docs/architecture.md`](docs/architecture.md) |

## Repository structure

```
.
├── site/                         # The web app. Vercel's Root Directory MUST be "site".
│   ├── src/
│   │   ├── app/                  # Routes: / (landing), /privacy, /terms, /sms-terms,
│   │   │   │                     #   robots.txt, sitemap.xml, 404
│   │   │   └── api/leads/        # POST /api/leads: quote-form endpoint (serverless)
│   │   ├── components/           # Page sections, QuoteForm, header/footer, icons
│   │   └── lib/
│   │       ├── business.ts       # ★ Name, address, phone, hours, service areas: edit here
│   │       ├── lead-schema.ts    # Form validation (shared by browser + server)
│   │       ├── lead-delivery.ts  # Supabase insert + Resend email alert
│   │       ├── analytics.ts      # GTM dataLayer events + UTM/gclid capture
│   │       └── rate-limit.ts
│   ├── tests/                    # Vitest: schema + API route
│   ├── .env.example              # Every environment variable, documented
│   └── vercel.json               # Pins framework to Next.js
├── supabase/migrations/          # Database schema (leads table, RLS)
├── design/                       # Draft 1 design canvas source (reference only, not deployed)
└── docs/                         # Architecture + project brief
```

## Run locally

Requires Node 20.9 or later.

```bash
cd site
npm install
cp .env.example .env.local   # optional: add keys to test real lead delivery
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server |
| `npm run build` | Production build (pages prerender as static HTML) |
| `npm run check` | Runs typecheck, lint and tests (run before every PR) |

## How leads work

1. A visitor submits the quote form. The browser validates it and sends it to `POST /api/leads`.
2. The server validates it again, checks the honeypot and the rate limit, then delivers it:
   - **Supabase** `public.leads` table, which is the durable record of every lead
   - an **email alert** sent through Resend, so the shop sees the lead within minutes
3. **If neither destination is configured, the form shows an error** asking the visitor to call or text. Leads are never silently dropped.

### Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Needed for | Exposed to browser? |
|---|---|---|
| `SUPABASE_URL` | Storing leads | No |
| `SUPABASE_SECRET_KEY` | Storing leads | **No: never add a `NEXT_PUBLIC_` prefix** |
| `RESEND_API_KEY` | Email alerts | No |
| `LEAD_ALERT_EMAIL` | Email alerts: who receives them (comma-separated) | No |
| `LEAD_ALERT_FROM` | Email alerts: sender on a domain verified in Resend | No |
| `NEXT_PUBLIC_GTM_ID` | Conversion tracking (optional) | Yes (public by design) |

### Database (Supabase)
| | |
|---|---|
| Project | `exclusive-auto-glass-pros` (organization: everjourneys) |
| Project ref | `ncpzkjinvknuocbgmobr` |
| API URL | `https://ncpzkjinvknuocbgmobr.supabase.co` (set as `SUPABASE_URL` in Vercel) |
| Region | us-east-1, the same region as Vercel's default functions |
| Plan | **Free.** Projects pause after about a week of low activity. Upgrade to Pro ($25/mo) before relying on it for paid traffic. |
| Schema | `supabase/migrations/20261119000000_create_leads.sql` (applied 2026-11-19) |

The `leads` table has Row Level Security turned on with **no public policies**, so only the server, using the secret key, can read or write it. Supabase's security advisor reports "RLS enabled, no policy" as INFO. That is intentional.

To change the schema, add a new file to `supabase/migrations/` and apply it with the Supabase CLI or the SQL editor. Never edit a migration that has already been applied.

## Conversion tracking
Taps on call, text and email links and successful form submissions push these events to `window.dataLayer`:
`click_call`, `click_text`, `click_email`, `lead_submit`. Set `NEXT_PUBLIC_GTM_ID`, then in Google Tag Manager fire your Google Ads and Meta conversion tags from those events. UTM parameters, `gclid` and `fbclid` are saved with each lead.

## Deployment
- `main` deploys to production at exclusiveautoglasspros.com automatically.
- Pull requests get their own Vercel preview links.
- Vercel project: `exclusive-auto-glass-pros-design`. Root Directory: **`site`**.
- DNS is managed at GoDaddy. The main domain has an A record pointing to Vercel, and www has a CNAME pointing to Vercel.

## Launch checklist
- [ ] Fill every `[bracketed]` placeholder: hours, rating, certification, license #, prices, quote email, founding year (most of these are in `src/lib/business.ts`)
- [ ] Replace the review placeholders with real Google reviews
- [ ] Confirm the California insurance wording ("often $0", right-to-choose)
- [x] Create the Supabase project, apply the migration, set `SUPABASE_URL` in Vercel
- [ ] Add `SUPABASE_SECRET_KEY` in Vercel (mark it Sensitive), then redeploy
- [ ] Upgrade Supabase to Pro so the leads database never pauses
- [ ] Set up Resend: verify the domain and set `RESEND_API_KEY`, `LEAD_ALERT_EMAIL` and `LEAD_ALERT_FROM`
- [ ] Submit a test lead in production and confirm it arrives
- [ ] Set up GTM, plus Google Ads and Meta conversion tags
- [ ] Get the privacy, terms and SMS terms pages reviewed
- [ ] Make www redirect to the main domain in Vercel → Domains
