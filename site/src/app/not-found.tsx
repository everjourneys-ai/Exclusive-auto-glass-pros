import Link from "next/link";

import { business, telHref } from "@/lib/business";

export default function NotFound() {
  return (
    <main className="section">
      <div className="container-narrow stack-16 center">
        <h1 className="h2">Page not found</h1>
        <p className="muted-lg">Need a windshield fixed? We can still help.</p>
        <div className="btn-row center-row">
          <a href={telHref} className="btn btn-primary" data-location="404">
            Call {business.phone.display}
          </a>
          <Link href="/" className="btn btn-outline">
            Go to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
