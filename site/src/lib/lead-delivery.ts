import "server-only";

import { createClient } from "@supabase/supabase-js";

import { business } from "./business";
import { CONTACT_LABELS, DAMAGE_LABELS, type Lead } from "./lead-schema";

/**
 * Where a lead goes after it passes validation.
 *
 *  1. Supabase `leads` table — the durable record (if configured).
 *  2. Email alert via Resend — so the shop sees it within minutes (if configured).
 *
 * A lead counts as delivered if at least one destination succeeds.
 * If NO destination is configured, delivery fails on purpose: silently
 * "accepting" a lead that nobody will ever see is worse than an error that
 * tells the visitor to call.
 *
 * All credentials are server-side environment variables (set in Vercel),
 * never shipped to the browser.
 */

export type DeliveryResult = {
  delivered: boolean;
  stored: boolean;
  alerted: boolean;
  errors: string[];
};

type Env = Partial<Record<string, string>>;

export async function deliverLead(lead: Lead, env: Env = process.env): Promise<DeliveryResult> {
  const result: DeliveryResult = { delivered: false, stored: false, alerted: false, errors: [] };

  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SECRET_KEY;
  const resendKey = env.RESEND_API_KEY;
  const alertTo = env.LEAD_ALERT_EMAIL;

  if (!(supabaseUrl && supabaseKey) && !(resendKey && alertTo)) {
    result.errors.push("No lead destination configured (set Supabase and/or Resend env vars).");
    return result;
  }

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const { error } = await supabase.from("leads").insert(toRow(lead));
      if (error) throw new Error(error.message);
      result.stored = true;
    } catch (err) {
      result.errors.push(`supabase: ${(err as Error).message}`);
    }
  }

  if (resendKey && alertTo) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: env.LEAD_ALERT_FROM ?? "Leads <onboarding@resend.dev>",
          to: alertTo.split(",").map((s) => s.trim()),
          subject: `New quote request — ${lead.name} (${CONTACT_LABELS[lead.contact]})`,
          text: alertText(lead),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      result.alerted = true;
    } catch (err) {
      result.errors.push(`resend: ${(err as Error).message}`);
    }
  }

  result.delivered = result.stored || result.alerted;
  return result;
}

export function toRow(lead: Lead) {
  return {
    damage_type: lead.damage,
    contact_method: lead.contact,
    first_name: lead.name,
    phone: lead.phone || null,
    email: lead.email || null,
    vehicle: lead.vehicle || null,
    zip: lead.zip || null,
    utm_source: lead.attribution.utm_source ?? null,
    utm_medium: lead.attribution.utm_medium ?? null,
    utm_campaign: lead.attribution.utm_campaign ?? null,
    utm_term: lead.attribution.utm_term ?? null,
    utm_content: lead.attribution.utm_content ?? null,
    gclid: lead.attribution.gclid ?? null,
    fbclid: lead.attribution.fbclid ?? null,
    landing_page: lead.attribution.landing_page ?? null,
    referrer: lead.attribution.referrer ?? null,
  };
}

function alertText(lead: Lead): string {
  const reach = lead.contact === "email" ? lead.email : lead.phone;
  return [
    `New quote request from ${business.url}`,
    "",
    `Name:        ${lead.name}`,
    `Reach by:    ${CONTACT_LABELS[lead.contact]} — ${reach}`,
    `Damage:      ${DAMAGE_LABELS[lead.damage]}`,
    `Vehicle:     ${lead.vehicle || "—"}`,
    `ZIP:         ${lead.zip || "—"}`,
    "",
    `Source:      ${lead.attribution.utm_source ?? "direct"} / ${lead.attribution.utm_campaign ?? "—"}`,
    lead.attribution.gclid ? `gclid:       ${lead.attribution.gclid}` : "",
    "",
    "Reply fast — speed to lead is the #1 driver of booked jobs.",
  ]
    .filter((line) => line !== "")
    .join("\n");
}
