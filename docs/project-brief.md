# Project Brief — Exclusive Auto Glass Pros Paid Ads Landing Page

**Status:** Draft 1 · **Date:** 2026-11-18 · **Owner:** EverJourneys
**Design:** https://claude.ai/artifact/Tt9wUdqq4P33etEFfW2bEV
**Source of truth:** the Notion Briefs page. This file is a copy for the repo.

## 1. Problem
Visitors who click a paid ad have urgent intent: a cracked windshield or a broken window. They leave if the next step isn't immediate and obvious. A general website, with navigation and long booking flows, loses them before they contact the shop.

## 2. Goal
Turn high-intent ad clicks into direct contact with the shop. Calls and texts come first, with a short quote form and email as secondary options. The shop then quotes and books same-day appointments.

## 3. Scope
**In scope**
- One landing page for paid traffic
- Call, text and email actions throughout the page
- A short quote form that asks for the visitor's preferred contact method
- A sticky action bar on phones
- Local positioning for Westlake Village, Thousand Oaks, the Conejo Valley and Ventura County
- Conversion tracking

**Out of scope (Version 1)**
- A full website or SEO content
- Mobile service (the business is shop-based)
- Online self-scheduling
- Payments

## 4. Requirements
- Every primary call to action calls or texts (805) 917-2036
- The form captures damage type, vehicle, ZIP, first name, and phone or email (whichever contact method the visitor picks)
- Leads are delivered to the shop instantly, and the visitor sees a confirmation with a "Call now" option
- SMS consent language appears next to the submit button
- The headline can change to match the ad, using URL parameters
- The page is fast on mobile, accessible (WCAG 2.1 AA), has no secrets in the client, and has spam protection

## 5. Users
- **Primary:** drivers in the service area with glass damage, arriving from an ad
- **Secondary:** shop staff who answer calls and texts and follow up on form leads

## 6. Customer journey
```
Ad → landing page → call / text / email / quote form → shop replies with price + same-day time → driver brings car to the shop
```

## 7. Integrations
- Call tracking with dynamic number insertion
- Form endpoint → CRM, plus an SMS or email alert to the shop
- Google Ads and Meta conversion tracking
- Static hosting and DNS

## 8. Constraints
- No claims about mobile service
- Name, address and phone must match the Google Business Profile exactly
- Insurance wording must be confirmed for California
- Reviews must be real Google reviews only

## 9. Success criteria
- Conversion rate tracked by source
- Most conversions come through calls and texts
- Form leads get a reply in about 10 minutes during business hours
- Cost per lead and cost per booked job are tracked

## 10. Deliverables
- Landing page design (Draft 1, complete)
- Final copy with every placeholder filled
- Production page with a working form, call tracking and conversion tracking
- Notion documentation of the final system
