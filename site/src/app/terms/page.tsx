import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { business } from "@/lib/business";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p>Last updated: [date]</p>
      <p>
        This website provides information about {business.name}&apos;s auto glass services and lets you request a
        quote. Quotes are estimates until we confirm your vehicle and glass; the final price is agreed before any work
        begins.
      </p>
      <p>
        Insurance coverage depends on your policy and deductible. We verify coverage with your insurer before work
        begins, but your insurer decides what is covered.
      </p>
      <p>[Add warranty terms, limitation of liability and governing law (California).]</p>
    </LegalPage>
  );
}
