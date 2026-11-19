import { deliverLead } from "@/lib/lead-delivery";
import { firstError, leadSchema } from "@/lib/lead-schema";
import { isRateLimited } from "@/lib/rate-limit";

/**
 * POST /api/leads — receives quote-form submissions.
 *
 * Flow: rate limit → parse JSON → validate (zod) → honeypot → deliver
 * (Supabase and/or email alert). Responses never echo internal errors.
 */
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many requests. Please call us instead." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: firstError(parsed.error) }, { status: 422 });
  }

  // Honeypot filled → almost certainly a bot. Pretend success so it moves on.
  if (parsed.data.company) {
    return Response.json({ ok: true });
  }

  const result = await deliverLead(parsed.data);
  if (!result.delivered) {
    console.error("[leads] delivery failed", result.errors);
    return Response.json(
      { ok: false, error: "We couldn't send your request. Please call or text us." },
      { status: 502 },
    );
  }
  if (result.errors.length) console.warn("[leads] partial delivery", result.errors);

  return Response.json({ ok: true });
}
