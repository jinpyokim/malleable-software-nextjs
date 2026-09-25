'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function VisitorTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'true' || pathname.startsWith('/dashboard') || navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
    // A short delay prevents React development effect replays from double-counting.
    const timer = setTimeout(() => {
      try {
        const key = 'malleable-analytics-session';
        const saved = sessionStorage.getItem(key);
        const previous = saved ? JSON.parse(saved) : null;
        const now = Date.now();
        const visitorId = previous?.visitorId ?? crypto.randomUUID();
        const sessionId = previous && now - previous.lastSeen < 30 * 60 * 1000 ? previous.sessionId : crypto.randomUUID();
        let source = previous?.source || 'Direct';
        if (!previous && document.referrer) {
          const referrer = new URL(document.referrer);
          if (referrer.hostname !== location.hostname) source = /(^|\.)(google|bing|duckduckgo|yahoo)\./.test(referrer.hostname) ? 'Search' : /(^|\.)(linkedin|facebook|twitter|x|reddit)\./.test(referrer.hostname) ? 'Social' : 'Referral';
        }
        sessionStorage.setItem(key, JSON.stringify({ visitorId, sessionId, lastSeen: now, source }));
        const device = /iPad|Tablet/i.test(navigator.userAgent) ? 'Tablet' : /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
        void fetch('/.netlify/functions/analytics-collect', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'omit', keepalive: true, body: JSON.stringify({ eventId: crypto.randomUUID(), visitorId, sessionId, path: pathname, source, device }) }).catch(() => {});
      } catch { /* Storage restrictions or analytics failures must not affect the website. */ }
    }, 250);
    return () => clearTimeout(timer);
  }, [pathname]);
  return null;
}
