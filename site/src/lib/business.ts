/**
 * Single source of truth for business details (NAP: name, address, phone).
 * Every phone link, text link, address and service-area mention on the site
 * reads from here, so a change made once updates the whole site.
 *
 * Keep NAP identical to the Google Business Profile.
 */

export const business = {
  name: "Exclusive Auto Glass Pros",
  url: "https://exclusiveautoglasspros.com",
  phone: {
    display: "(805) 917-2036",
    e164: "+18059172036",
  },
  // TODO(owner): replace with the real quote inbox before launch.
  email: "[quotes@yourdomain.com]",
  address: {
    street: "755 Lakefield Rd. Unit I",
    city: "Westlake Village",
    region: "CA",
    postalCode: "91361",
    country: "US",
  },
  // TODO(owner): confirm real hours.
  hoursLabel: "Open 7 days, [7am–7pm]",
  serviceAreas: [
    "Thousand Oaks",
    "Westlake Village",
    "Newbury Park",
    "Agoura Hills",
    "Oak Park",
    "Camarillo",
    "Moorpark",
    "Simi Valley",
    "Ventura",
  ],
  // TODO(owner): replace with real Google rating data.
  rating: { value: "[4.9]", count: "[###]" },
} as const;

export const telHref = `tel:${business.phone.e164}`;

/** Pre-filled SMS link. Uses the `?&body=` form, which works on iOS and Android. */
export function smsHref(body?: string): string {
  if (!body) return `sms:${business.phone.e164}`;
  return `sms:${business.phone.e164}?&body=${encodeURIComponent(body)}`;
}

export const mailHref = `mailto:${business.email}?subject=${encodeURIComponent("Windshield quote")}`;

export const fullAddress = `${business.address.street}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`;

export const mapsHref = `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`;
