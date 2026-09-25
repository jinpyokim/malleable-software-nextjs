import type { Config, Context } from '@netlify/functions';
import { createHash } from 'node:crypto';
import { store, validEvent } from '../lib/analytics';

export default async (request: Request, context: Context) => {
  if (request.method !== 'POST') return new Response(null, { status: 405 });
  if (process.env.ANALYTICS_ENABLED !== 'true') return new Response(null, { status: 204 });
  if (request.headers.get('origin') !== new URL(request.url).origin) return new Response(null, { status: 403 });
  if (request.headers.get('dnt') === '1' || request.headers.get('sec-gpc') === '1') return new Response(null, { status: 204 });
  if (!request.headers.get('content-type')?.includes('application/json')) return new Response(null, { status: 415 });
  const body = await request.text();
  if (body.length > 2048) return new Response(null, { status: 413 });
  let event: unknown;
  try { event = JSON.parse(body); } catch { return new Response(null, { status: 400 }); }
  if (!validEvent(event)) return new Response(null, { status: 400 });
  const geo = context.geo;
  const latitude = typeof geo?.latitude === 'number' && Number.isFinite(geo.latitude) ? Math.round(geo.latitude * 10) / 10 : null;
  const longitude = typeof geo?.longitude === 'number' && Number.isFinite(geo.longitude) ? Math.round(geo.longitude * 10) / 10 : null;
  const city = geo?.city || 'Unknown city';
  const country = geo?.country?.name || 'Unknown';
  const locationId = createHash('sha256').update(`${country}|${city}|${latitude}|${longitude}`).digest('hex').slice(0, 16);
  const date = new Date().toISOString().slice(0, 10);
  await store().setJSON(`${date}/${event.eventId}`, { id: event.eventId, visitorId: event.visitorId, sessionId: event.sessionId, path: event.path, date, source: event.source, device: event.device, location: { id: locationId, city, country, latitude, longitude } }, { onlyIfNew: true });
  return new Response(null, { status: 204 });
};
export const config: Config = { rateLimit: { action: 'rate_limit', aggregateBy: ['ip', 'domain'], windowSize: 60, windowLimit: 60 } };
