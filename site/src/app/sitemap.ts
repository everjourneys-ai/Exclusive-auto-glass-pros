import type { MetadataRoute } from "next";

import { business } from "@/lib/business";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy", "/terms", "/sms-terms"].map((path) => ({
    url: `${business.url}${path}`,
    changeFrequency: path ? "yearly" : "monthly",
    priority: path ? 0.2 : 1,
  }));
}
