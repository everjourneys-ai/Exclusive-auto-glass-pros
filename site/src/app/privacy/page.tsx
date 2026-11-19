import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { business, fullAddress } from "@/lib/business";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Last updated: [date]</p>
      <h2>What we collect</h2>
      <p>
        When you request a quote we collect the details you enter: your first name, phone number or email, vehicle,
        ZIP code and the type of glass damage. We also record which ad or website sent you here (for example UTM
        parameters or a Google click ID) so we know which advertising works.
      </p>
      <h2>How we use it</h2>
      <p>
        We use your details only to respond to your request — to call, text or email you with a price and an
        appointment time — and to handle any insurance claim you ask us to file. We do not sell your information.
      </p>
      <h2>Who we share it with</h2>
      <p>
        Service providers that help us run the website and receive your request (website hosting, our lead database
        and email delivery), and your insurance company if you ask us to file a claim.
      </p>
      <h2>Cookies and analytics</h2>
      <p>[Describe any analytics or advertising tags in use, e.g. Google Tag Manager / Google Ads conversion tracking.]</p>
      <h2>Your choices</h2>
      <p>
        You can ask us to access or delete your information at any time. California residents may have additional
        rights under the CCPA/CPRA.
      </p>
      <h2>Contact</h2>
      <p>
        {business.name}, {fullAddress} · {business.phone.display} · {business.email}
      </p>
    </LegalPage>
  );
}
