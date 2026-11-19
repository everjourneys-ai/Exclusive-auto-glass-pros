/**
 * Small in-memory rate limiter for the lead endpoint.
 *
 * It is per serverless instance (not global), so it only blunts bursts from a
 * single source. That is enough for a landing page; if spam becomes a real
 * problem, move this to a shared store (e.g. Upstash Redis) or add Vercel
 * Firewall rules / a CAPTCHA.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HITS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep memory bounded.
  if (hits.size > 5000) hits.clear();

  return recent.length > MAX_HITS;
}

export function resetRateLimit() {
  hits.clear();
}
