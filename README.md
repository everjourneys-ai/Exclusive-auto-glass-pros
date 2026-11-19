# Exclusive Auto Glass Pros — Paid Ads Landing Page

A single-purpose landing page for paid ad traffic (Google Ads, Meta) for **Exclusive Auto Glass Pros**, a shop-based auto glass business in Westlake Village, CA. The goal is to turn high-intent visitors into **calls and texts** first, with a short quote form and email as secondary options.

**Status:** Draft 1. The design is done, but the copy still has placeholders and the form isn't connected to anything yet. **Do not run ads to this page until the launch checklist below is complete.**

| | |
|---|---|
| Business | Exclusive Auto Glass Pros |
| Address | 755 Lakefield Rd. Unit I, Westlake Village, CA 91361 |
| Phone | (805) 917-2036 |
| Service area | Westlake Village, Thousand Oaks, Newbury Park, Agoura Hills, Oak Park, Camarillo, Moorpark, Simi Valley, Ventura |
| Model | Shop-based (not a mobile service) |
| Design (Draft 1) | https://claude.ai/artifact/Tt9wUdqq4P33etEFfW2bEV |

## Repository structure

```
.
├── site/
│   └── index.html            # Deployable static page (HTML + CSS + a little vanilla JS)
├── design/
│   ├── landing-page.dc.html  # Source of the design canvas (Claude Design format)
│   └── canvas.json           # Canvas layout index for the design
├── docs/
│   └── project-brief.md      # Project brief (mirrors the Notion Briefs page)
├── .gitignore
└── README.md
```

- **`site/`** is what gets deployed. It is one self-contained HTML file with no build step and no dependencies. Fonts load from Google Fonts.
- **`design/`** is the reference design. It is exported from the design canvas so that design changes are version-controlled too. It is **not** deployed: it needs the design editor's runtime to render.
- When the design changes, update `design/` first and then carry the change into `site/index.html`.

## Run locally

No install is needed. Open `site/index.html` in a browser, or serve the folder:

```bash
npx serve site
# or
python3 -m http.server --directory site 8000
```

## How the page converts

- **There is no site navigation.** Every section ends in Call, Text or Quote.
- **Click to call** (`tel:+18059172036`) is in the sticky header, the hero, the service cards, the insurance section, the urgency band and the final call to action.
- **Click to text** (`sms:+18059172036`) opens a message with the text already started, so visitors can send a photo of the damage.
- **The quote form** asks for: damage type, vehicle, ZIP, preferred contact method (call / text / email), and name with phone or email.
- **On phones**, a Call · Text · Quote action bar is pinned to the bottom of the screen (below 900px wide).
- **The FAQ** uses native `<details>` elements, so it needs no JavaScript.

## Quote form — not connected yet

In `site/index.html`, `FORM_ENDPOINT` is empty, so for now submissions are only validated and the visitor sees the confirmation screen. **No lead is sent anywhere.** Before launch:

1. Choose the form backend: a form service, a serverless function, or a CRM webhook.
2. Set `FORM_ENDPOINT` to the approved URL. Never put API keys or secrets in this file, because it runs in the browser.
3. Make sure every lead triggers an instant SMS or email alert to the shop.
4. Keep the honeypot field (`company`), and add rate limiting or CAPTCHA on the backend if spam shows up.

## Launch checklist

- [ ] Fill every `[bracketed]` placeholder: hours, Google rating and review count, certification, license #, prices, quote email, founding year
- [ ] Replace the review placeholders with 3 **real** Google reviews
- [ ] Confirm the insurance wording for California ("often $0", right-to-choose)
- [ ] Confirm the FAQ answers match how the shop works (waiting vs. drop-off)
- [ ] Connect the quote form (see above)
- [ ] Call tracking: show a tracking number only to ad visitors, and keep (805) 917-2036 on the Google Business Profile
- [ ] Conversion tracking for calls, texts, form submits and email clicks (Google Ads / Meta)
- [ ] Legal review of the SMS consent language (TCPA)
- [ ] Privacy, Terms and SMS terms pages (the footer links are `#` for now)
- [ ] Hosting and domain (e.g. Vercel static deploy from `site/`), DNS and HTTPS

## Deployment (planned)

```
Domain → DNS → Static hosting (serves site/) → Browser
                                     ↘ Form endpoint → CRM + SMS/email alert to shop
```

This is static hosting with no server. The only moving part is the form endpoint. Hosting, domain and form backend are still to be decided at the architecture step.

## Branching

- `main` holds the current approved version.
- Changes go on short feature branches, are merged through pull requests, and the merge triggers a deploy once hosting is connected.

## Documentation

The project docs live in Notion (Workflow DB → Projects → *Exclusive Auto Glass Pros*, and the matching page in Briefs).
