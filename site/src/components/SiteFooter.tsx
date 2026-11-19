import Link from "next/link";

import { business, fullAddress, mapsHref, smsHref, telHref } from "@/lib/business";

import { PhoneIcon } from "./Icons";

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="container stack-16">
          <div className="footer-row">
            <span className="footer-brand">{business.name}</span>
            <nav aria-label="Footer" className="footer-nav">
              <a href={telHref} className="footer-phone" data-location="footer">
                {business.phone.display}
              </a>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/sms-terms">SMS terms</Link>
            </nav>
          </div>
          <p className="fine">
            © 2026 {business.name} · <a href={mapsHref}>{fullAddress}</a> · [License #] ·
            *Coverage depends on your policy and deductible; we verify before work begins. **[Confirm right-to-choose
            wording for California.]
          </p>
        </div>
      </footer>

      {/* Sticky action bar — phones only (CSS shows it below 900px). */}
      <nav className="mbar" aria-label="Contact options">
        <a href={telHref} className="btn btn-primary mbar-call" data-location="mobile_bar">
          <PhoneIcon size={18} />
          Call now
        </a>
        <a href={smsHref("Hi, I need a windshield quote. Vehicle: ")} className="btn btn-dark" data-location="mobile_bar">
          Text
        </a>
        <Link href="/#quote" className="btn btn-outline">
          Quote
        </Link>
      </nav>
    </>
  );
}
