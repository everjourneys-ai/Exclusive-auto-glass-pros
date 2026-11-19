"use client";

import { useEffect } from "react";

import { captureAttribution, eventForHref, track } from "@/lib/analytics";

/**
 * One listener for the whole page: any tap on a tel:/sms:/mailto: link is
 * recorded as a conversion event. This keeps every call/text button a plain
 * <a> (works without JavaScript) while still being tracked.
 */
export function ConversionTracker() {
  useEffect(() => {
    captureAttribution();

    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a");
      const event = eventForHref(link?.getAttribute("href") ?? null);
      if (event) track(event, { link_location: link?.dataset.location ?? "unknown" });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
