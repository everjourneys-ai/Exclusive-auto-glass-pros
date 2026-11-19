/**
 * Conversion tracking helpers (browser only).
 *
 * Events are pushed to `window.dataLayer`, which Google Tag Manager reads.
 * GTM is only loaded when NEXT_PUBLIC_GTM_ID is set, so nothing is tracked
 * until the owner connects their tag container. In GTM, create triggers on
 * these event names and fire Google Ads / Meta conversion tags from them:
 *
 *   click_call   — a tel: link was tapped
 *   click_text   — an sms: link was tapped
 *   click_email  — a mailto: link was tapped
 *   lead_submit  — the quote form was delivered successfully
 */

export type ConversionEvent = "click_call" | "click_text" | "click_email" | "lead_submit";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: ConversionEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}

/** Maps a link href to the conversion event it represents, if any. */
export function eventForHref(href: string | null): ConversionEvent | null {
  if (!href) return null;
  if (href.startsWith("tel:")) return "click_call";
  if (href.startsWith("sms:")) return "click_text";
  if (href.startsWith("mailto:")) return "click_email";
  return null;
}

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

const STORAGE_KEY = "eagp_attribution";

/**
 * Captures ad attribution (UTMs, gclid, fbclid) from the landing URL and keeps
 * it for the session, so a lead submitted after scrolling still records which
 * ad it came from.
 */
export function captureAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  let stored: Record<string, string> = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const fresh: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) fresh[key] = value;
  }

  if (Object.keys(fresh).length || !stored.landing_page) {
    stored = {
      ...stored,
      ...fresh,
      landing_page: stored.landing_page ?? window.location.pathname + window.location.search,
      referrer: stored.referrer ?? document.referrer ?? "",
    };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* storage can be unavailable (private mode) — attribution is best-effort */
    }
  }
  return stored;
}
