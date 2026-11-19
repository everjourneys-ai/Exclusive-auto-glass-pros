# Architecture: Exclusive Auto Glass Pros web app

**Status:** Draft. Open for review in the PR that introduces it.
**Replaces:** Draft 1, a single static `index.html` file.

## What the system is

This is a lead-generation web app for paid ad traffic. Its job is to turn visitors into **calls, texts, quote-form leads and emails**. Calls and texts are the main goal.

```
Visitor's browser
   │  https://exclusiveautoglasspros.com
   ▼
GoDaddy DNS ──► Vercel (project: exclusive-auto-glass-pros-design, Root Directory: site/)
                   │
                   ├── Static pages (prerendered at build): /, /privacy, /terms, /sms-terms
                   │      └── tel:/sms:/mailto: links → phone, messaging app or email app
                   │
                   └── POST /api/leads  (serverless function)
                          ├── validate (zod) · honeypot · rate limit
                          ├──► Supabase Postgres: public.leads   (durable record)
                          │      project exclusive-auto-glass-pros · ref ncpzkjinvknuocbgmobr · us-east-1
                          └──► Resend email API: alert to the shop (speed to lead)

Browser ──► Google Tag Manager (optional) ──► Google Ads / Meta conversion tags
```

## Decisions

### ADR-001: Next.js (React) on Vercel
- **Context.** The page needs to stay fast and indexable, since ad quality scores and local SEO both depend on it. It also now needs a small server piece to receive form leads safely, and room to grow (service pages, city pages, a leads dashboard).
- **Options considered:**
  - Plain HTML plus a third-party form service
  - Vite and React as a single-page app plus separate serverless functions
  - Next.js
- **Chosen:** Next.js 16 (App Router, TypeScript), deployed on Vercel.
- **Why:**
  - Pages are **prerendered to static HTML**, so they're as fast as the old file.
  - The form endpoint lives in the **same project** as a Route Handler, so there's no second service to run.
  - Vercel is Next.js's native host.
- **Trade-offs.** Next.js brings more dependencies and a build step than a plain HTML file. A Vite single-page app would render on the client, which is worse for SEO and first paint.
- **Consequences.** The Vercel project needs **Root Directory = `site`**, and `site/vercel.json` pins the framework to Next.js.

### ADR-002: Leads go to Supabase and an email alert; fail loudly if neither is set up
- **Context.** A form that shows "thanks!" while the lead goes nowhere loses money without anyone noticing.
- **Chosen:** `/api/leads` writes to Supabase (the durable record) and/or sends an email alert through Resend (speed to lead). If **neither** is configured, the endpoint returns an error, and the visitor is told to call or text.
- **Security:**
  - The Supabase **secret** key is used only on the server, from Vercel environment variables.
  - Row Level Security is enabled on `leads` with no public policies, so the public key can neither read nor write leads.
  - All input is validated on the server.

### ADR-003: One file for business details
`src/lib/business.ts` holds the name, address, phone, hours and service areas. Every call/text link and address on the site reads from it, so a change made there updates the whole site.

### ADR-004: Conversion tracking through the GTM dataLayer
- Taps on call, text and email links, and successful form submissions, push `click_call`, `click_text`, `click_email` and `lead_submit` events to the dataLayer.
- GTM loads only when `NEXT_PUBLIC_GTM_ID` is set.
- Ad attribution (UTM parameters, `gclid`, `fbclid`) is saved for the visitor's session and sent with each lead.

## What must not be changed casually
- **Vercel Root Directory = `site`.** If it's cleared, the site returns a 404.
- **`SUPABASE_SECRET_KEY` must never get a `NEXT_PUBLIC_` prefix.** That prefix would expose it in the browser.
- **Row Level Security on `public.leads` must stay enabled** with no public policies.
- **The business name, address and phone in `business.ts` must match the Google Business Profile.**

## Known limitations
- Supabase is on the Free plan, so the leads database pauses after about a week of low activity. Upgrade to Pro before running paid traffic, or rely on the email alert as a backup.
- The rate limiter is per serverless instance, not global. If spam becomes a problem, move it to Vercel Firewall or Upstash.
- The legal pages are drafts and need professional review.
- Reviews, hours, prices and certifications are still placeholders.
