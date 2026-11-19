import Image from "next/image";
import Link from "next/link";

import { business, telHref } from "@/lib/business";

import { PhoneIcon } from "./Icons";

/** Urgency strip + sticky header. No navigation links — only conversion actions. */
export function SiteHeader() {
  return (
    <>
      <div className="urgency-strip">
        <span className="urgency-live">
          <span aria-hidden="true" className="live-dot" />
          <strong>Same-day appointments available</strong>
        </span>
        <span>
          · Serving Westlake Village, Thousand Oaks &amp; the Conejo Valley · {business.hoursLabel}
        </span>
      </div>

      <header className="site-header">
        <div className="container header-row">
          <Link href="/" className="brand" aria-label={`${business.name} home`}>
            <Image
              src="/logo-exclusive.png"
              alt=""
              width={201}
              height={28}
              priority
              className="brand-logo"
            />
            <span className="brand-sub">Auto Glass Pros</span>
          </Link>
          <div className="header-actions">
            <div className="hdr-num">
              <span className="hdr-label">Talk to a technician now</span>
              <a href={telHref} className="hdr-phone" data-location="header_number">
                {business.phone.display}
              </a>
            </div>
            <a href={telHref} className="btn btn-primary btn-sm" data-location="header_button">
              <PhoneIcon size={18} />
              Call now
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
