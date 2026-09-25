import type { Config } from '@netlify/functions';
import { authorized, responseHeaders, store, type StoredEvent } from '../lib/analytics';
import type { AnalyticsDataset, Visit } from '../../lib/analytics/data';

export default async (request: Request) => {
  if (request.method !== 'GET') return new Response(null, { status: 405 });
  if (!process.env.ANALYTICS_DASHBOARD_TOKEN || process.env.ANALYTICS_DASHBOARD_TOKEN.length < 32) return Response.json({ error: 'Configure a dashboard access key in Netlify first.' }, { status: 503, headers: responseHeaders });
  if (!authorized(request)) return Response.json({ error: 'Invalid dashboard access key.' }, { status: 401, headers: responseHeaders });
  if (process.env.ANALYTICS_ENABLED !== 'true') return Response.json({ error: 'Enable ANALYTICS_ENABLED and NEXT_PUBLIC_ANALYTICS_ENABLED in Netlify and redeploy to start collecting visits.' }, { status: 503, headers: responseHeaders });
  const endDate = new Date().toISOString().slice(0, 10);
  const storage = store();
  const result: AnalyticsDataset = { mode: 'live', endDate, locations: [], visits: [] };
  const sessions = new Map<string, Visit>();
  const locationIds = new Set<string>();
  // Read at most 30 days. Stop explicitly instead of returning silently truncated totals.
  let count = 0;
  for (let day = 0; day < 30; day++) {
    const date = new Date(`${endDate}T00:00:00Z`); date.setUTCDate(date.getUTCDate() - day);
    const { blobs } = await storage.list({ prefix: `${date.toISOString().slice(0, 10)}/` });
    count += blobs.length;
    if (count > 20000) return Response.json({ error: 'This dashboard has reached its 20,000-event query limit. Use an aggregated analytics service for higher traffic.' }, { status: 422, headers: responseHeaders });
    for (let offset = 0; offset < blobs.length; offset += 25) {
      const events = await Promise.all(blobs.slice(offset, offset + 25).map(blob => storage.get(blob.key, { type: 'json' }) as Promise<StoredEvent | null>));
      for (const event of events) {
        if (!event) continue;
        if (!locationIds.has(event.location.id)) { locationIds.add(event.location.id); result.locations.push(event.location); }
        const key = `${event.date}|${event.visitorId}|${event.sessionId}|${event.location.id}`;
        const visit = sessions.get(key);
        if (visit) visit.pages.push(event.path);
        else sessions.set(key, { visitorId: event.visitorId, date: event.date, locationId: event.location.id, pages: [event.path], source: event.source, device: event.device });
      }
    }
  }
  result.visits = [...sessions.values()];
  return Response.json(result, { headers: responseHeaders });
};
export const config: Config = { rateLimit: { action: 'rate_limit', aggregateBy: ['ip', 'domain'], windowSize: 60, windowLimit: 10 } };
