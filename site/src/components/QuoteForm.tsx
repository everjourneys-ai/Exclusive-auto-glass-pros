"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { captureAttribution, track } from "@/lib/analytics";
import { business, telHref } from "@/lib/business";
import {
  CONTACT_LABELS,
  CONTACT_METHODS,
  DAMAGE_LABELS,
  DAMAGE_TYPES,
  firstError,
  leadSchema,
} from "@/lib/lead-schema";

type Contact = (typeof CONTACT_METHODS)[number];
type Status = "idle" | "sending" | "sent";

const VERBS: Record<Contact, string> = { call: "call you", text: "text you", email: "email you" };

export function QuoteForm() {
  const [contact, setContact] = useState<Contact>("call");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = leadSchema.safeParse({ ...data, attribution: captureAttribution() });
    if (!parsed.success) {
      setError(firstError(parsed.error));
      return;
    }

    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "send failed");

      track("lead_submit", { damage_type: parsed.data.damage, contact_method: parsed.data.contact });
      setFirstName(parsed.data.name.split(" ")[0]);
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      const msg = (err as Error).message;
      setError(
        msg && msg !== "send failed"
          ? msg
          : `Something went wrong sending your request. Please call ${business.phone.display}.`,
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="quote-card" id="quote">
        <div role="status" className="stack-16" style={{ padding: "12px 0" }}>
          <div className="success-badge">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="h2-card">Got it, {firstName} — you&apos;re in the queue.</h2>
          <p className="body-lg">
            A technician will {VERBS[contact]} within about [10] minutes during business hours with your exact
            price and the next open time slot.
          </p>
          <p className="body">Need it faster? Call now and skip the wait:</p>
          <a href={telHref} className="btn btn-primary btn-block" data-location="form_success">
            Call {business.phone.display}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-card" id="quote">
      <form onSubmit={onSubmit} noValidate className="stack-18" aria-busy={status === "sending"}>
        <div>
          <h2 className="h2-card">Get your free quote in 60 seconds</h2>
          <p className="muted">No obligation. Exact price, not a range.</p>
        </div>

        <fieldset className="fieldset">
          <legend className="legend">1. What&apos;s damaged?</legend>
          <div className="chips chips-2">
            {DAMAGE_TYPES.map((d, i) => (
              <label key={d} className="chip">
                <input type="radio" name="damage" value={d} defaultChecked={i === 0} />
                <span>{DAMAGE_LABELS[d]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="stack-10">
          <span className="legend">2. Your vehicle &amp; location</span>
          <div className="field-grid">
            <label className="field">
              Year / make / model
              <input type="text" name="vehicle" autoComplete="off" placeholder="2019 Honda CR-V" />
            </label>
            <label className="field">
              ZIP code
              <input type="text" name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="91360" />
            </label>
          </div>
        </div>

        <fieldset className="fieldset">
          <legend className="legend">3. How should we reach you?</legend>
          <div className="chips chips-3">
            {CONTACT_METHODS.map((c) => (
              <label key={c} className="chip chip-center">
                <input
                  type="radio"
                  name="contact"
                  value={c}
                  checked={contact === c}
                  onChange={() => {
                    setContact(c);
                    setError("");
                  }}
                />
                <span>{CONTACT_LABELS[c]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field-grid">
          <label className="field">
            First name
            <input type="text" name="name" autoComplete="given-name" required />
          </label>
          {contact === "email" ? (
            <label className="field">
              Email
              <input type="email" name="email" autoComplete="email" required />
            </label>
          ) : (
            <label className="field">
              Mobile phone
              <input type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="(805) 555-1234" required />
            </label>
          )}
        </div>

        {/* Honeypot: hidden from people and screen readers; bots tend to fill it. */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />

        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary btn-submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Get my free quote →"}
        </button>
        <p className="fine">
          A real technician replies — no call centers, no spam. By submitting you agree to be contacted by{" "}
          {business.name} by call, text or email about your request. Msg &amp; data rates may apply. Reply STOP to
          opt out. <Link href="/privacy">Privacy</Link> · <Link href="/sms-terms">SMS terms</Link>
        </p>
      </form>
    </div>
  );
}
