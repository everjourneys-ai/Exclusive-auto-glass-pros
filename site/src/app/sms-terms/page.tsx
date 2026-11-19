import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { business } from "@/lib/business";

export const metadata: Metadata = { title: "SMS Terms", alternates: { canonical: "/sms-terms" } };

export default function SmsTermsPage() {
  return (
    <LegalPage title="SMS Terms">
      <p>Last updated: [date]</p>
      <p>
        When you text {business.name} or choose &quot;Text me&quot; on our quote form, you agree to receive text
        messages from us about your quote and appointment. These are conversational messages about your request, not
        marketing.
      </p>
      <ul>
        <li>Message frequency varies with your request.</li>
        <li>Message and data rates may apply.</li>
        <li>Reply STOP at any time to stop receiving messages. Reply HELP for help.</li>
        <li>Consent to receive texts is not a condition of any purchase.</li>
      </ul>
      <p>Questions? Call {business.phone.display}.</p>
    </LegalPage>
  );
}
