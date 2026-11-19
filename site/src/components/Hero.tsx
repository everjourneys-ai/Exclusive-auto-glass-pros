import { business, smsHref, telHref } from "@/lib/business";

import { CheckIcon, MessageIcon, PhoneIcon, StarIcon } from "./Icons";
import { QuoteForm } from "./QuoteForm";

const HERO_POINTS = [
  "We file your insurance claim",
  "Same-day appointments at our shop",
  "Lifetime workmanship warranty",
  "ADAS camera recalibration in-house",
];

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="stack-22 hero-copy">
          <span className="eyebrow">Westlake Village &amp; Thousand Oaks windshield repair &amp; replacement</span>
          <h1 className="h1">Cracked windshield? Get it fixed today in Westlake Village.</h1>
          <p className="hero-sub">
            Get an exact price in minutes, book a same-day time at our shop, and let us file the insurance claim for
            you. Every job is backed by a lifetime workmanship warranty.
          </p>

          <div className="btn-row">
            <a href={telHref} className="btn btn-primary btn-lg" data-location="hero_call">
              <PhoneIcon />
              Call {business.phone.display}
            </a>
            <a
              href={smsHref("Hi, I need a windshield quote. Vehicle: ")}
              className="btn btn-outline-light btn-lg"
              data-location="hero_text"
            >
              <MessageIcon />
              Text us a photo
            </a>
          </div>
          <p className="hero-note">
            Text a picture of the damage — a technician replies with a price, usually within [10] minutes.
          </p>

          <ul className="check-list">
            {HERO_POINTS.map((point) => (
              <li key={point}>
                <CheckIcon className="check-green" />
                {point}
              </li>
            ))}
          </ul>

          <div className="rating-row">
            <div className="stars" role="img" aria-label="Five stars">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <span>
              <strong>{business.rating.value}</strong> from {business.rating.count} Google reviews
            </span>
          </div>
        </div>

        <QuoteForm />
      </div>
    </section>
  );
}
