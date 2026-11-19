import { describe, expect, it } from "vitest";

import { leadSchema } from "@/lib/lead-schema";

const base = { damage: "chip", contact: "call", name: "Maria", phone: "(805) 555-1234" };

describe("leadSchema", () => {
  it("accepts a minimal phone lead and fills defaults", () => {
    const r = leadSchema.safeParse(base);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.email).toBe("");
      expect(r.data.attribution).toEqual({});
    }
  });

  it("requires a name", () => {
    const r = leadSchema.safeParse({ ...base, name: "   " });
    expect(r.success).toBe(false);
  });

  it("requires a 10-digit phone for call/text", () => {
    expect(leadSchema.safeParse({ ...base, phone: "555-1234" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...base, contact: "text", phone: "" }).success).toBe(false);
  });

  it("requires a valid email when contact is email, and no phone", () => {
    expect(leadSchema.safeParse({ ...base, contact: "email", phone: "", email: "nope" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...base, contact: "email", phone: "", email: "m@example.com" }).success).toBe(true);
  });

  it("rejects unknown damage types and bad ZIPs", () => {
    expect(leadSchema.safeParse({ ...base, damage: "sunroof" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...base, zip: "9136" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...base, zip: "91361" }).success).toBe(true);
  });

  it("caps field lengths", () => {
    expect(leadSchema.safeParse({ ...base, name: "x".repeat(81) }).success).toBe(false);
  });
});
