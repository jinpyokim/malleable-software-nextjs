export type Location = { id: string; city: string; country: string; latitude: number | null; longitude: number | null };
export type Visit = { visitorId: string; date: string; locationId: string; pages: string[]; source: string; device: string };
export type AnalyticsDataset = { mode: 'demo' | 'live'; endDate: string; locations: Location[]; visits: Visit[] };

const locations: Location[] = [
  { id: 'sf', city: 'San Francisco', country: 'United States', latitude: 37.77, longitude: -122.42 },
  { id: 'ny', city: 'New York', country: 'United States', latitude: 40.71, longitude: -74.01 },
  { id: 'tor', city: 'Toronto', country: 'Canada', latitude: 43.65, longitude: -79.38 },
  { id: 'lon', city: 'London', country: 'United Kingdom', latitude: 51.51, longitude: -0.13 },
  { id: 'ber', city: 'Berlin', country: 'Germany', latitude: 52.52, longitude: 13.41 },
  { id: 'seo', city: 'Seoul', country: 'South Korea', latitude: 37.57, longitude: 126.98 },
  { id: 'tok', city: 'Tokyo', country: 'Japan', latitude: 35.68, longitude: 139.69 },
  { id: 'sin', city: 'Singapore', country: 'Singapore', latitude: 1.35, longitude: 103.82 },
  { id: 'ben', city: 'Bengaluru', country: 'India', latitude: 12.97, longitude: 77.59 },
  { id: 'syd', city: 'Sydney', country: 'Australia', latitude: -33.87, longitude: 151.21 },
  { id: 'sao', city: 'São Paulo', country: 'Brazil', latitude: -23.55, longitude: -46.63 },
  { id: 'cap', city: 'Cape Town', country: 'South Africa', latitude: -33.92, longitude: 18.42 },
];

// Stable fictional sessions for previewing the dashboard. No tracking is installed.
export function createDemoDataset(): AnalyticsDataset {
  const endDate = '2026-09-24';
  const visits: Visit[] = [];
  const sources = ['Direct', 'Search', 'Referral', 'Social'];
  for (let day = 0; day < 30; day++) {
    const date = new Date(`${endDate}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() - 29 + day);
    locations.forEach((location, index) => {
      const count = 2 + ((day * 7 + index * 11) % 14) + (index < 2 ? 15 : 0);
      for (let session = 0; session < count; session++) {
        visits.push({
          visitorId: `${location.id}-${(day * 13 + session) % (index < 2 ? 140 : 90)}`,
          date: date.toISOString().slice(0, 10), locationId: location.id,
          pages: Array.from({ length: 1 + ((day + session + index) % 3) }, () => '/'),
          source: sources[(day + session * 3 + index) % sources.length],
          device: (day + session + index) % 5 < 3 ? 'Desktop' : (session % 4 ? 'Mobile' : 'Tablet'),
        });
      }
    });
  }
  return { mode: 'demo', endDate, locations, visits };
}

export function summarize(data: AnalyticsDataset, days: number, locationId: string | null) {
  const start = new Date(`${data.endDate}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - days + 1);
  const startDate = start.toISOString().slice(0, 10);
  const period = data.visits.filter(visit => visit.date >= startDate && visit.date <= data.endDate);
  const visits = period.filter(visit => !locationId || visit.locationId === locationId);
  const unique = (items: Visit[]) => new Set(items.map(visit => visit.visitorId)).size;
  const cities = data.locations.map(location => {
    const items = period.filter(visit => visit.locationId === location.id);
    return { ...location, visitors: unique(items), sessions: items.length, views: items.reduce((total, visit) => total + visit.pages.length, 0) };
  }).filter(location => location.sessions > 0).sort((a, b) => b.visitors - a.visitors);
  const daily = Array.from({ length: days }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(date.getUTCDate() + index);
    const label = date.toISOString().slice(0, 10);
    return { date: label, visitors: unique(visits.filter(visit => visit.date === label)) };
  });
  const countBy = (items: string[]) => Object.entries(items.reduce<Record<string, number>>((result, item) => {
    result[item] = (result[item] ?? 0) + 1; return result;
  }, {})).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  return {
    startDate, visitors: unique(visits), sessions: visits.length,
    views: visits.reduce((total, visit) => total + visit.pages.length, 0),
    countries: new Set(cities.filter(city => !locationId || city.id === locationId).map(city => city.country).filter(country => country !== 'Unknown')).size,
    cities, daily, pages: countBy(visits.flatMap(visit => visit.pages)),
    sources: countBy(visits.map(visit => visit.source)), devices: countBy(visits.map(visit => visit.device)),
  };
}
