import { Hero } from "@/components/Hero";
import {
  FAQS,
  Faq,
  HowItWorks,
  Insurance,
  Reviews,
  ServiceArea,
  Services,
  TrustBar,
  UrgencyBand,
  WhyUs,
} from "@/components/Sections";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { business } from "@/lib/business";

/** Structured data so Google understands the business (local SEO) and the FAQ. */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: business.name,
    url: business.url,
    telephone: business.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed: business.serviceAreas.map((name) => ({ "@type": "City", name })),
    priceRange: "$$",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
];

export default function Home() {
  return (
    <div className="page">
      <script
        type="application/ld+json"
        // JSON.stringify output is safe here: all values are our own constants.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <HowItWorks />
        <Insurance />
        <Reviews />
        <UrgencyBand />
        <WhyUs />
        <Faq />
        <ServiceArea />
      </main>
      <SiteFooter />
    </div>
  );
}
