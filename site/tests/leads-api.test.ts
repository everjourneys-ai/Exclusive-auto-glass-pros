import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/leads/route";
import { deliverLead } from "@/lib/lead-delivery";
import { leadSchema } from "@/lib/lead-schema";
import { resetRateLimit } from "@/lib/rate-limit";

const valid = { damage: "crack", contact: "text", name: "Sam", phone: "805-555-1234", vehicle: "2019 Honda CR-V" };

function req(body: unknown, ip = "1.1.1.1") {
  return new Request("http://localhost/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  resetRateLimit();
  vi.unstubAllEnvs();
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("POST /api/leads", () => {
  it("returns 400 for invalid JSON", async () => {
    expect((await POST(req("{not json"))).status).toBe(400);
  });

  it("returns 422 with a readable message for invalid leads", async () => {
    const res = await POST(req({ ...valid, phone: "12" }));
    expect(res.status).toBe(422);
    expect((await res.json()).error).toMatch(/10-digit/);
  });

  it("silently accepts honeypot submissions without delivering", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const res = await POST(req({ ...valid, company: "spam inc" }));
    expect(res.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("fails loudly (502) when no destination is configured, so leads are never silently lost", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await POST(req(valid));
    expect(res.status).toBe(502);
  });

  it("delivers via email alert when Resend is configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("LEAD_ALERT_EMAIL", "shop@example.com");
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 200 }));
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    expect(fetchSpy).toHaveBeenCalledWith("https://api.resend.com/emails", expect.objectContaining({ method: "POST" }));
  });

  it("rate limits repeated submissions from one IP", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    let last = 0;
    for (let i = 0; i < 6; i++) last = (await POST(req(valid, "9.9.9.9"))).status;
    expect(last).toBe(429);
  });
});

describe("deliverLead", () => {
  it("reports partial success when one destination fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("err", { status: 500 }));
    const lead = leadSchema.parse(valid);
    const result = await deliverLead(lead, { RESEND_API_KEY: "x", LEAD_ALERT_EMAIL: "a@b.co" });
    expect(result.delivered).toBe(false);
    expect(result.errors[0]).toMatch(/resend/);
  });
});
