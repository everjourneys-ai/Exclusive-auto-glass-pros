import { business, fullAddress, mailHref, smsHref, telHref } from "@/lib/business";

import { BadgeIcon, CheckIcon, ClockIcon, ShieldIcon } from "./Icons";

export function TrustBar() {
  const items = [
    { Icon: ShieldIcon, title: "All major insurers", sub: "We bill them directly" },
    { Icon: BadgeIcon, title: "[Certified] technicians", sub: "[e.g. AGSC-certified, licensed & insured]" },
    { Icon: ClockIcon, title: "Same-day service", sub: "Most chips fixed in ~30 min" },
    { Icon: CheckIcon, title: "Lifetime warranty", sub: "On workmanship & leaks" },
  ];
  return (
    <section aria-label="Why customers trust us" className="trust-bar">
      <div className="container grid-auto-210">
        {items.map(({ Icon, title, sub }) => (
          <div key={title} className="trust-item">
            <Icon size={30} className="ink" />
            <div>
              <strong>{title}</strong>
              <span>{sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="section">
      <div className="container stack-36">
        <div className="section-intro">
          <h2 className="h2">Repair or replace? We&apos;ll tell you honestly.</h2>
          <p className="lead">
            If it can be repaired, we repair it — it&apos;s faster and usually cheaper. Not sure? Text us a photo and
            we&apos;ll tell you in minutes.
          </p>
        </div>
        <div className="grid-auto-280">
          <article className="card">
            <span className="pill pill-green">Often $0 with insurance*</span>
            <h3 className="h3">Chip &amp; small crack repair</h3>
            <p className="muted-lg">
              Chips smaller than a quarter and short cracks. Resin-filled to stop the spread and restore clarity.
            </p>
            <ul className="card-list">
              <li>About 30 minutes</li>
              <li>Drive away immediately</li>
              <li>Keeps your factory seal</li>
            </ul>
            <a href="#quote" className="btn btn-outline card-cta">
              Get a repair price
            </a>
          </article>
          <article className="card card-featured">
            <span className="pill pill-amber">Most requested</span>
            <h3 className="h3">Windshield replacement</h3>
            <p className="muted-lg">
              Long cracks, damage in the driver&apos;s view, or shattered glass. OEM-quality glass and urethane.
            </p>
            <ul className="card-list">
              <li>About 60–90 minutes in our shop</li>
              <li>ADAS camera recalibration included</li>
              <li>Lifetime leak warranty</li>
            </ul>
            <a href={telHref} className="btn btn-primary card-cta" data-location="service_replacement">
              Call for today&apos;s price
            </a>
          </article>
          <article className="card">
            <span className="pill pill-blue">Secure your car fast</span>
            <h3 className="h3">Side &amp; rear windows</h3>
            <p className="muted-lg">
              Break-ins and broken back glass. We vacuum the glass out and replace the window — often the same day.
            </p>
            <ul className="card-list">
              <li>Glass cleanup included</li>
              <li>Rear defroster glass available</li>
              <li>Power window repair</li>
            </ul>
            <a
              href={smsHref("Hi, I need a side/rear window replaced. Vehicle: ")}
              className="btn btn-outline card-cta"
              data-location="service_side_rear"
            >
              Text us a photo
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    ["Call, text or request a quote", "Whatever's easiest. Send a photo and your vehicle — that's all we need."],
    ["Get an exact price & time", "We confirm the glass, check your insurance and lock in a time — often today."],
    [
      "Drop in & drive away",
      `Bring your car to our ${business.address.city} shop at your booked time. Chip repairs are done while you wait.`,
    ],
  ];
  return (
    <section className="section section-white">
      <div className="container stack-36">
        <h2 className="h2 center">Fixed in 3 simple steps</h2>
        <ol className="steps grid-auto-260">
          {steps.map(([title, body], i) => (
            <li key={title} className="stack-10">
              <span className="step-num">{i + 1}</span>
              <h3 className="h3-sm">{title}</h3>
              <p className="muted-lg">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Insurance() {
  const points: [string, string][] = [
    ["We bill your insurer directly.", "No paying up front and waiting to be reimbursed."],
    ["You choose the shop.", "Your insurer can't require you to use a specific glass company.**"],
    ["No insurance?", "Upfront cash pricing — [and financing options]."],
  ];
  return (
    <section className="section">
      <div className="container">
        <div className="insurance-panel">
          <div className="stack-16">
            <h2 className="h2 h2-light">Using insurance? We do the paperwork.</h2>
            <p className="lead-light">
              Many comprehensive policies cover glass repair at little or no cost to you.* Give us your carrier and
              policy number — we verify coverage and file the claim while you&apos;re on the phone.
            </p>
            <div className="btn-row">
              <a href={telHref} className="btn btn-primary" data-location="insurance_call">
                Check my coverage — call
              </a>
              <a href="#quote" className="btn btn-outline-light">
                Request a callback
              </a>
            </div>
          </div>
          <ul className="insurance-list">
            {points.map(([strong, rest]) => (
              <li key={strong}>
                <CheckIcon size={24} className="check-green" />
                <span>
                  <strong>{strong}</strong> {rest}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Placeholders only — replace with REAL Google reviews. Never invent testimonials. */
const REVIEWS = [
  "[Paste a real customer review — ideally one that mentions speed or same-day service.]",
  "[Paste a real review that mentions the insurance claim being handled for them.]",
  "[Paste a real review that mentions how quick and easy the shop visit was.]",
];

export function Reviews() {
  return (
    <section className="section section-top-0">
      <div className="container stack-32">
        <div className="reviews-head">
          <h2 className="h2">What Conejo Valley drivers say</h2>
          <span>
            <strong>{business.rating.value} ★</strong> average · {business.rating.count} Google reviews
          </span>
        </div>
        <div className="grid-auto-280">
          {REVIEWS.map((text) => (
            <figure key={text} className="card review">
              <span className="review-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </span>
              <blockquote>{text}</blockquote>
              <figcaption>
                <strong>[First name, last initial]</strong> · [Vehicle] · Google
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UrgencyBand() {
  return (
    <section className="urgency-band">
      <div className="container urgency-row">
        <div className="urgency-copy">
          <h2 className="h2-band">Don&apos;t let a chip become a crack.</h2>
          <p>
            Bumps, potholes and temperature swings spread chips fast. A $[XX] repair today can save a full replacement
            next week.
          </p>
        </div>
        <div className="btn-row">
          <a href={telHref} className="btn btn-dark btn-lg" data-location="urgency_call">
            Call {business.phone.display}
          </a>
          <a
            href={smsHref("Hi, I have a windshield chip. Vehicle: ")}
            className="btn btn-outline btn-lg"
            data-location="urgency_text"
          >
            Text a photo
          </a>
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  const reasons = [
    ["A real person answers", "No phone tree, no national call center. You talk to the team that does the work."],
    ["Exact price up front", "The price we quote is the price you pay. No surprise fees on the day."],
    ["Safety systems done right", "Lane-assist and auto-braking cameras recalibrated after every replacement that needs it."],
    ["Quality glass", "OEM or OEM-equivalent glass that meets federal safety standards."],
    ["Locally owned since [year]", "[###] windshields replaced across the Conejo Valley. We'll be here if you ever need us."],
    ["Lifetime warranty", "Leaks, wind noise or workmanship issues — we come back and fix it free."],
  ];
  return (
    <section className="section">
      <div className="container stack-32">
        <h2 className="h2">Why drivers call us first</h2>
        <div className="grid-auto-260 gap-24">
          {reasons.map(([title, body]) => (
            <div key={title} className="stack-8">
              <h3 className="h3-sm">{title}</h3>
              <p className="muted-lg">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const FAQS: [string, string][] = [
  [
    "Will my insurance cover it?",
    "Many comprehensive policies cover chip repair at no cost and replacement after your deductible. Give us your carrier and we will verify your exact coverage before any work begins — and file the claim for you.",
  ],
  [
    "How much does it cost without insurance?",
    "Chip repair starts at $[XX]. Replacement depends on your vehicle and features like rain sensors or lane-assist cameras. Text us a photo and your year/make/model for an exact price.",
  ],
  [
    "How long does it take?",
    "Chip repairs take about 30 minutes. Replacements take about 60–90 minutes in our shop, plus a short cure time before driving (we will tell you exactly how long).",
  ],
  [
    "Do I need an appointment?",
    "Booking ahead guarantees your time slot — call or text and we can often fit you in the same day. Chip repairs are done while you wait; for replacements you can wait in our shop or drop the car off.",
  ],
  [
    "My car has lane-assist / auto-braking. Is that a problem?",
    "Not at all. Those cameras look through the windshield, so we recalibrate them after replacement when your vehicle requires it.",
  ],
  [
    "Can I drive with a cracked windshield?",
    "Small chips are usually safe short-term, but cracks in the driver’s line of sight can be unsafe and may get you a ticket. Chips spread quickly — fixing them early is cheaper.",
  ],
];

export function Faq() {
  return (
    <section className="section section-white">
      <div className="container-narrow stack-28">
        <h2 className="h2 center">Common questions</h2>
        <div className="faq-list">
          {FAQS.map(([q, a], i) => (
            <details key={q} className="faq" open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <p className="center body">
          Still have a question?{" "}
          <a href={telHref} className="strong-link" data-location="faq">
            Call
          </a>
          ,{" "}
          <a href={smsHref()} className="strong-link" data-location="faq">
            text
          </a>{" "}
          or{" "}
          <a href={mailHref} className="strong-link" data-location="faq">
            email us
          </a>{" "}
          — we answer fast.
        </p>
      </div>
    </section>
  );
}

export function ServiceArea() {
  return (
    <section className="section">
      <div className="container area-grid">
        <div className="stack-14">
          <h2 className="h2-md">Serving Ventura County &amp; the Conejo Valley</h2>
          <p className="muted-lg">
            {business.serviceAreas.join(" · ")} · and nearby. Questions about getting here? Just call or text.
          </p>
          <p className="body">
            <strong className="ink">Shop:</strong> {fullAddress} ·{" "}
            <a href={telHref} className="strong-link" data-location="service_area">
              {business.phone.display}
            </a>
          </p>
        </div>
        <div className="final-cta">
          <h2 className="h2-cta">Get it fixed today.</h2>
          <p>Pick whatever&apos;s easiest — we reply fast.</p>
          <a href={telHref} className="btn btn-primary btn-lg btn-block" data-location="final_call">
            Call {business.phone.display}
          </a>
          <div className="final-grid">
            <a href={smsHref("Hi, I need a windshield quote. Vehicle: ")} className="btn btn-outline-light" data-location="final_text">
              Text
            </a>
            <a href="#quote" className="btn btn-outline-light">
              Quote form
            </a>
            <a href={mailHref} className="btn btn-outline-light" data-location="final_email">
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
