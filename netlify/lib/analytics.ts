import { createHash, timingSafeEqual } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import type { Location } from '../../lib/analytics/data';

export type StoredEvent = { id: string; visitorId: string; sessionId: string; date: string; path: string; source: string; device: string; location: Location };
export const responseHeaders = { 'Cache-Control': 'private, no-store', 'Content-Type': 'application/json' };
export const store = () => getStore({ name: `visitor-analytics-${process.env.CONTEXT || 'development'}`, consistency: 'strong' });
export function authorized(request: Request) {
  const expected = process.env.ANALYTICS_DASHBOARD_TOKEN;
  if (!expected || expected.length < 32) return false;
  const actual = request.headers.get('authorization')?.replace(/^Bearer /, '') ?? '';
  return timingSafeEqual(createHash('sha256').update(actual).digest(), createHash('sha256').update(expected).digest());
}
export function validEvent(value: unknown): value is { eventId: string; visitorId: string; sessionId: string; path: string; source: string; device: string } {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return ['eventId', 'visitorId', 'sessionId'].every(key => typeof v[key] === 'string' && uuid.test(v[key] as string)) &&
    typeof v.path === 'string' && /^\/(?:blog(?:\/[a-z0-9-]+)?)?$/.test(v.path) &&
    ['Direct', 'Search', 'Referral', 'Social'].includes(v.source as string) && ['Desktop', 'Mobile', 'Tablet'].includes(v.device as string);
}
