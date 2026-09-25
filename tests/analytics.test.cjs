const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
// Compile the actual source modules in memory; no test-only copies of the logic.
require.extensions['.ts'] = (module, filename) => {
  const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } });
  module._compile(output.outputText, filename);
};
const { summarize, createDemoDataset } = require('../lib/analytics/data.ts');
const backend = require('../netlify/lib/analytics.ts');
const collect = require('../netlify/functions/analytics-collect.ts').default;
const stats = require('../netlify/functions/analytics-stats.ts').default;
const retention = require('../netlify/functions/analytics-retention.ts').default;
const uuid = 'c7d4a883-a91b-4f77-a9cd-397011b80001';
const payload = { eventId: uuid, visitorId: uuid, sessionId: uuid, path: '/', source: 'Direct', device: 'Desktop' };
const request = (body, origin = 'https://example.com') => new Request('https://example.com/.netlify/functions/analytics-collect', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) });

test('date ranges and period visitor deduplication', () => {
  const data = { mode: 'live', endDate: '2026-09-24', locations: [{ id: 'x', city: 'Unknown city', country: 'Unknown', latitude: null, longitude: null }], visits: [
    { visitorId: 'a', date: '2026-09-24', locationId: 'x', pages: ['/', '/'], source: 'Direct', device: 'Desktop' },
    { visitorId: 'a', date: '2026-09-23', locationId: 'x', pages: ['/'], source: 'Direct', device: 'Desktop' },
    { visitorId: 'b', date: '2026-09-01', locationId: 'x', pages: ['/'], source: 'Direct', device: 'Desktop' },
    { visitorId: 'c', date: '2026-09-25', locationId: 'x', pages: ['/'], source: 'Direct', device: 'Desktop' },
  ] };
  const result = summarize(data, 7, null);
  assert.equal(result.visitors, 1); assert.equal(result.sessions, 2); assert.equal(result.views, 3);
  assert.equal(result.countries, 0); assert.equal(result.cities.length, 1);
  assert.equal(result.daily.reduce((n, day) => n + day.visitors, 0), 2);
  assert.equal(summarize(data, 30, null).visitors, 2);
});

test('city filtering keeps metrics and breakdown totals consistent', () => {
  const result = summarize(createDemoDataset(), 14, 'sf');
  assert.equal(result.countries, 1);
  assert.equal(result.views, result.pages.reduce((sum, row) => sum + row.count, 0));
  assert.equal(result.sessions, result.sources.reduce((sum, row) => sum + row.count, 0));
  assert.equal(result.sessions, result.devices.reduce((sum, row) => sum + row.count, 0));
  assert.equal(result.visitors, result.cities.find(city => city.id === 'sf').visitors);
});

test('collector rejects arbitrary paths, sensitive URL queries, invalid IDs and dimensions', () => {
  assert.equal(backend.validEvent(payload), true);
  for (const patch of [{ path: '/dashboard' }, { path: '/?email=private@example.com' }, { path: '//evil.com' }, { visitorId: 'not-an-id' }, { source: 'https://private.example' }]) assert.equal(backend.validEvent({ ...payload, ...patch }), false);
});

test('access keys fail closed and are compared correctly', () => {
  delete process.env.ANALYTICS_DASHBOARD_TOKEN;
  assert.equal(backend.authorized(new Request('https://example.com')), false);
  process.env.ANALYTICS_DASHBOARD_TOKEN = 'a'.repeat(48);
  assert.equal(backend.authorized(new Request('https://example.com', { headers: { authorization: `Bearer ${'a'.repeat(48)}` } })), true);
  assert.equal(backend.authorized(new Request('https://example.com', { headers: { authorization: 'Bearer wrong' } })), false);
});

test('collector stores approximate location without IP, uses event deduplication, and rejects foreign origins', async () => {
  process.env.ANALYTICS_ENABLED = 'true';
  const saved = [];
  backend.store = () => ({ setJSON: async (...args) => saved.push(args) });
  const context = { geo: { city: 'London', country: { name: 'United Kingdom' }, latitude: 51.5074, longitude: -0.1278 }, ip: '192.0.2.1' };
  assert.equal((await collect(request(payload, 'https://other.example'), context)).status, 403);
  assert.equal(saved.length, 0);
  assert.equal((await collect(request(payload), context)).status, 204);
  assert.equal(saved[0][1].location.latitude, 51.5);
  assert.equal(saved[0][1].location.longitude, -0.1);
  assert.equal(saved[0][1].ip, undefined);
  assert.equal(saved[0][2].onlyIfNew, true);
  assert.equal((await collect(request(payload), { geo: {} })).status, 204);
  assert.equal(saved[1][1].location.latitude, null);
});

test('disabled collection and browser privacy signals do not write data', async () => {
  backend.store = () => { throw new Error('Storage must not be touched'); };
  process.env.ANALYTICS_ENABLED = 'false';
  assert.equal((await collect(request(payload), {})).status, 204);
  process.env.ANALYTICS_ENABLED = 'true';
  const optedOut = request(payload); optedOut.headers.set('sec-gpc', '1');
  assert.equal((await collect(optedOut, {})).status, 204);
});

test('stats endpoint requires authentication before reading storage', async () => {
  backend.store = () => { throw new Error('Unauthorized read'); };
  process.env.ANALYTICS_DASHBOARD_TOKEN = 'a'.repeat(48);
  const response = await stats(new Request('https://example.com'));
  assert.equal(response.status, 401);
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
});

test('live stats group events into visits and preserve page-view totals', async () => {
  const today = new Date().toISOString().slice(0, 10);
  const location = { id: 'loc', city: 'London', country: 'United Kingdom', latitude: 51.5, longitude: -0.1 };
  const event = { id: uuid, visitorId: uuid, sessionId: uuid, path: '/', date: today, source: 'Direct', device: 'Desktop', location };
  backend.store = () => ({ list: async ({ prefix }) => ({ blobs: prefix === `${today}/` ? [{ key: 'a' }, { key: 'b' }] : [] }), get: async () => event });
  const response = await stats(new Request('https://example.com', { headers: { authorization: `Bearer ${'a'.repeat(48)}` } }));
  const data = await response.json();
  assert.equal(response.status, 200); assert.equal(data.mode, 'live'); assert.equal(data.visits.length, 1);
  assert.equal(data.visits[0].pages.length, 2); assert.equal(data.locations.length, 1);
});

test('retention removes only expired event keys', async () => {
  const deleted = [];
  backend.store = () => ({ list: async function* () { yield { blobs: [{ key: '2000-01-01/old' }, { key: `${new Date().toISOString().slice(0, 10)}/new` }] }; }, delete: async key => deleted.push(key) });
  await retention(); assert.deepEqual(deleted, ['2000-01-01/old']);
});
