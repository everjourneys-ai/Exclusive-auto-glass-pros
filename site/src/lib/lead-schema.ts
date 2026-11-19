import { z } from "zod";

/**
 * Shared validation for quote-form leads.
 * Used by the browser (instant feedback) and the API route (the real check —
 * never trust the browser).
 */

export const DAMAGE_TYPES = ["chip", "crack", "replace", "window"] as const;
export const CONTACT_METHODS = ["call", "text", "email"] as const;

export const DAMAGE_LABELS: Record<(typeof DAMAGE_TYPES)[number], string> = {
  chip: "Chip / small ding",
  crack: "Crack",
  replace: "Shattered / replace",
  window: "Side or rear window",
};

export const CONTACT_LABELS: Record<(typeof CONTACT_METHODS)[number], string> = {
  call: "Call me",
  text: "Text me",
  email: "Email me",
};

const trimmed = (max: number) => z.string().trim().max(max);

const attributionSchema = z
  .object({
    utm_source: trimmed(200).optional(),
    utm_medium: trimmed(200).optional(),
    utm_campaign: trimmed(200).optional(),
    utm_term: trimmed(200).optional(),
    utm_content: trimmed(200).optional(),
    gclid: trimmed(300).optional(),
    fbclid: trimmed(300).optional(),
    landing_page: trimmed(500).optional(),
    referrer: trimmed(500).optional(),
  })
  .partial()
  .default({});

export const leadSchema = z
  .object({
    damage: z.enum(DAMAGE_TYPES),
    contact: z.enum(CONTACT_METHODS),
    name: trimmed(80).min(1, "Please add your first name."),
    phone: trimmed(30).optional().default(""),
    email: trimmed(200).optional().default(""),
    vehicle: trimmed(120).optional().default(""),
    zip: z
      .string()
      .trim()
      .regex(/^(\d{5})?$/, "ZIP code should be 5 digits.")
      .optional()
      .default(""),
    /** Honeypot — real people never fill this in. */
    company: z.string().optional().default(""),
    attribution: attributionSchema,
  })
  .superRefine((lead, ctx) => {
    if (lead.contact === "email") {
      if (!z.email().safeParse(lead.email).success) {
        ctx.addIssue({ code: "custom", path: ["email"], message: "Please enter a valid email address." });
      }
    } else if (lead.phone.replace(/\D/g, "").length < 10) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Please enter a 10-digit mobile number so we can reach you.",
      });
    }
  });

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

/** First human-readable error message, for showing in the form. */
export function firstError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Please check the form and try again.";
}
