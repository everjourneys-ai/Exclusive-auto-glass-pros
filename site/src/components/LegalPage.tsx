import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** Shared shell for the legal pages (privacy, terms, SMS terms). */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="page">
      <SiteHeader />
      <main className="section">
        <article className="container-narrow legal">
          <p className="draft-note" role="note">
            Draft — have this reviewed by a qualified professional before running ads.
          </p>
          <h1 className="h2">{title}</h1>
          {children}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
