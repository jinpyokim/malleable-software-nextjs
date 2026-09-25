'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { createDemoDataset, summarize, type AnalyticsDataset } from '../../lib/analytics/data';

const number = (value: number) => value.toLocaleString('en-US');
const dateLabel = (value: string) => new Date(`${value}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

function Breakdown({ title, rows, unit }: { title: string; rows: { name: string; count: number }[]; unit: string }) {
  const total = rows.reduce((sum, row) => sum + row.count, 0);
  return <section className="dashboard-panel breakdown"><div className="dashboard-panel-title"><h2>{title}</h2><span>{unit}</span></div><div>{rows.map(row => <div className="breakdown-row" key={row.name}><div><span>{row.name}</span><strong>{number(row.count)} <small>{total ? Math.round(row.count / total * 100) : 0}%</small></strong></div><div className="breakdown-track"><span style={{ width: `${total ? row.count / total * 100 : 0}%` }} /></div></div>)}</div></section>;
}

export function VisitorDashboard() {
  const [data, setData] = useState<AnalyticsDataset | null>(null);
  const [accessKey, setAccessKey] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function load() {
    setBusy(true); setError('');
    try {
      const response = await fetch('/.netlify/functions/analytics-stats', { headers: { Authorization: `Bearer ${accessKey}` }, cache: 'no-store' });
      if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('Live analytics requires a Netlify deployment with tracking enabled. You can preview the dashboard below.');
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to load analytics.');
      if (result.mode !== 'live' || !Array.isArray(result.visits) || !Array.isArray(result.locations)) throw new Error('Unexpected analytics response.');
      setData(result);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Unable to connect to analytics.'); }
    finally { setBusy(false); }
  }
  if (data) return <>
    <div className="dashboard-session-controls"><span>{data.mode === 'live' ? 'Authenticated analytics' : 'Dashboard preview'}</span>{data.mode === 'live' && <button className="dashboard-refresh" disabled={busy} onClick={load}>{busy ? 'Refreshing…' : 'Refresh data'}</button>}<button className="dashboard-refresh" disabled={busy} onClick={() => { setData(null); setAccessKey(''); setError(''); }}> {data.mode === 'live' ? 'Lock dashboard' : 'Exit preview'}</button></div>
    {error && <p className="dashboard-error" role="alert">{error} Previously loaded data is still shown.</p>}
    <DashboardContent dataset={data} />
  </>;
  return <>
    <div className="dashboard-breadcrumb"><Link href="/">← Website</Link><span>ANALYTICS / PRIVATE ACCESS</span></div>
    <header className="dashboard-heading"><div><div className="eyebrow"><span className="accent-dot" /> VISITOR ANALYTICS</div><h1>Your audience.<br /><em>Across the world.</em></h1><p>Unlock visitor statistics, location insights, and traffic trends.</p></div></header>
    <form className="dashboard-login" onSubmit={event => { event.preventDefault(); void load(); }}><label>Dashboard access key<input type="password" autoComplete="current-password" required value={accessKey} onChange={event => setAccessKey(event.target.value)} placeholder="Enter your private access key" /></label><button type="submit" className="button primary" disabled={busy}>{busy ? 'Connecting…' : 'Open live dashboard'}</button>{error && <p className="dashboard-error" role="alert">{error}</p>}</form>
    <section className="dashboard-preview-intro"><h2>Explore the dashboard</h2><p>Preview the world map and reports with clearly labeled fictional data.</p><button className="dashboard-export" onClick={() => { setData(createDemoDataset()); setError(''); }}>View demo dashboard ↗</button></section>
  </>;
}

function DashboardContent({ dataset }: { dataset: AnalyticsDataset }) {
  const [days, setDays] = useState(7);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [locationSearch, setLocationSearch] = useState('');
  const summary = useMemo(() => summarize(dataset, days, locationId), [dataset, days, locationId]);
  const selected = summary.cities.find(city => city.id === locationId);
  const shownCities = summary.cities.filter(city => `${city.city} ${city.country}`.toLowerCase().includes(locationSearch.trim().toLowerCase()));
  const maxDaily = Math.max(1, ...summary.daily.map(day => day.visitors));
  const maxCity = Math.max(1, ...summary.cities.map(city => city.visitors));

  function exportCsv() {
    const escape = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
    const rows = [['Data mode', 'Start date', 'End date', 'City', 'Country', 'Visitors', 'Sessions', 'Page views'], ...summary.cities.filter(city => !locationId || city.id === locationId).map(city => [dataset.mode === 'demo' ? 'Demo — fictional data' : 'Live analytics', summary.startDate, dataset.endDate, city.city, city.country, city.visitors, city.sessions, city.views])];
    const url = URL.createObjectURL(new Blob(['\uFEFF' + rows.map(row => row.map(escape).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url; link.download = `malleable-${dataset.mode}-visitors-${days}days.csv`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <>
    <div className="dashboard-breadcrumb"><Link href="/">← Website</Link><span>ANALYTICS / OVERVIEW</span></div>
    <header className="dashboard-heading"><div><div className="eyebrow"><span className="accent-dot" /> YOUR AUDIENCE, IN PERSPECTIVE</div><h1>Visitor <em>overview.</em></h1><p>A world of curious minds. See where the connections begin.</p></div><button className="dashboard-export" onClick={exportCsv}>Export {dataset.mode === 'demo' ? 'demo ' : ''}CSV <span aria-hidden="true">↓</span></button></header>
    {dataset.mode === 'demo' ? <aside className="dashboard-demo"><span className="demo-pill">DEMO DATA</span><p>This preview uses fictional visitors, not your website’s traffic.</p></aside> : <div className="dashboard-live-notice"><span className="accent-dot" /> Recorded website traffic · refresh to load the latest data</div>}
    <div className="dashboard-toolbar"><div className="dashboard-period" aria-label="Date range">{[7, 14, 30].map(range => <button key={range} aria-pressed={days === range} onClick={() => setDays(range)}>{range} days</button>)}</div><span>{dateLabel(summary.startDate)} – {dateLabel(dataset.endDate)}, {dataset.endDate.slice(0, 4)} <span className="dashboard-utc">UTC</span></span></div>
    <div className="dashboard-scope" aria-live="polite"><span>{selected ? `Showing ${selected.city}, ${selected.country}` : 'Showing all locations'}</span>{selected && <button onClick={() => setLocationId(null)}>Clear location ×</button>}</div>
    <section className="dashboard-metrics" aria-label="Visitor statistics">{[
      { name: 'Unique visitors', value: summary.visitors, note: 'Distinct anonymous browser-tab IDs', icon: '◎' },
      { name: 'Page views', value: summary.views, note: 'Includes repeat page visits', icon: '▤' },
      { name: 'Sessions', value: summary.sessions, note: 'Visits split at UTC midnight', icon: '↗' },
      { name: 'Countries', value: summary.countries, note: 'Countries represented by visitors', icon: '⊕' },
    ].map(metric => <article className="dashboard-metric" key={metric.name}><div><span>{metric.name}</span><span aria-hidden="true">{metric.icon}</span></div><strong>{number(metric.value)}</strong><p>{metric.note}</p></article>)}</section>
    {dataset.mode === 'live' && summary.sessions === 0 && <aside className="dashboard-demo"><p>No visits recorded for this selection yet. Visit the website with tracking allowed, then refresh the dashboard.</p></aside>}
    <section className="dashboard-panel map-panel" aria-labelledby="visitor-map-title"><div className="dashboard-panel-title"><div><h2 id="visitor-map-title">Visitors around the world</h2><p>Select a dot to explore a city’s traffic.</p></div><span className="map-legend"><i /> Larger dots, more visitors</span></div>
      <div className="visitor-world-map"><img src="/world-map.svg" width="1000" height="500" alt="World map; selectable city locations appear over the map and in the table below." />
        {summary.cities.filter(city => city.latitude !== null && city.longitude !== null).map(city => <button key={city.id} className={`visitor-dot${locationId === city.id ? ' selected' : ''}`} style={{ left: `${(city.longitude! + 180) / 360 * 100}%`, top: `${(90 - city.latitude!) / 180 * 100}%`, '--dot-size': `${8 + city.visitors / maxCity * 13}px` } as React.CSSProperties} onClick={() => setLocationId(locationId === city.id ? null : city.id)} aria-pressed={city.id === locationId} aria-label={`${city.city}, ${city.country}: ${number(city.visitors)} visitors. Filter by this city.`}><span className="visitor-dot-core" /><span className="visitor-dot-tooltip">{city.city}<b>{number(city.visitors)} visitors</b></span></button>)}
      </div><div className="map-bottom"><span>{summary.cities.filter(city => city.latitude !== null && city.longitude !== null).length} {dataset.mode === 'demo' ? 'sample ' : ''}mapped locations · approximate city level</span><span>Map: Natural Earth / World Atlas</span></div>
    </section>
    <section className="dashboard-panel traffic-panel" aria-labelledby="traffic-title"><div className="dashboard-panel-title"><div><h2 id="traffic-title">Visitor activity</h2><p>Daily unique visitors · {selected?.city ?? 'all locations'}</p></div><span>{days}-day view</span></div><div className="traffic-chart" role="img" aria-label={`Daily unique visitors: ${summary.daily.map(day => `${dateLabel(day.date)}: ${day.visitors}`).join('; ')}`}><div className="traffic-axis"><span>{number(maxDaily)}</span><span>{number(Math.round(maxDaily / 2))}</span><span>0</span></div><div className="traffic-bars">{summary.daily.map(day => <div key={day.date} className="traffic-bar-column"><div className="traffic-bar" style={{ height: `${day.visitors / maxDaily * 100}%` }} title={`${dateLabel(day.date)}: ${number(day.visitors)} visitors`} /></div>)}</div></div><div className="traffic-dates"><span>{dateLabel(summary.startDate)}</span><span>{dateLabel(dataset.endDate)}</span></div><p className="chart-note">A returning visitor counts once per day; period totals count each visitor only once.</p></section>
    <div className="dashboard-details"><section className="dashboard-panel location-panel"><div className="dashboard-panel-title"><h2>Top locations</h2><span>All locations · {days} days</span></div><label className="location-search"><span className="sr-only">Search cities or countries</span><input type="search" placeholder="Find a city or country…" value={locationSearch} onChange={event => setLocationSearch(event.target.value)} /></label><div className="locations-table-wrap"><table className="locations-table"><thead><tr><th scope="col">Location</th><th scope="col">Visitors</th><th scope="col">Views</th></tr></thead><tbody>{shownCities.map(city => <tr key={city.id} className={city.id === locationId ? 'selected' : ''}><td><button onClick={() => setLocationId(city.id === locationId ? null : city.id)} aria-pressed={city.id === locationId}>{city.city}<span>{city.country}</span></button></td><td>{number(city.visitors)}</td><td>{number(city.views)}</td></tr>)}</tbody></table>{shownCities.length === 0 && <p className="locations-empty" role="status">No matching locations.</p>}</div></section><div className="dashboard-breakdowns"><Breakdown title="Traffic sources" rows={summary.sources} unit="Sessions" /><Breakdown title="Devices" rows={summary.devices} unit="Sessions" /><Breakdown title="Top pages" rows={summary.pages} unit="Page views" /></div></div>
    <div className="dashboard-footnote"><span className="accent-dot" /><p>{dataset.mode === 'demo' ? 'Fictional data for preview. ' : ''}Locations are approximate, not individual addresses. Visitors are anonymous browser-tab identifiers; new tabs or cleared storage may count separately. Unknown locations remain in the table and totals.</p></div>
  </>;
}
