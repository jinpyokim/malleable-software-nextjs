# Visitor analytics

Dashboard: `/dashboard`. It is not linked from public navigation and is marked noindex. The HTML shell is public; live data is protected by the server-side access-key check. Demo data is available without authentication and explicitly labeled.

## Activate on Netlify

1. Set these environment variables in the Netlify site settings:
   - `NEXT_PUBLIC_ANALYTICS_ENABLED=true` (Build scope): includes the page-view collector in the website.
   - `ANALYTICS_ENABLED=true` (Functions scope): allows the collection endpoint to store events.
   - `ANALYTICS_DASHBOARD_TOKEN=<random secret of at least 32 characters>` (Functions scope only). Generate a key using a password manager or `openssl rand -hex 32`. Never prefix this secret with `NEXT_PUBLIC_` or commit it.
2. Build and deploy the site to Netlify. Functions require Netlify; `next dev` and static-only file hosting do not run the endpoints. Retain the existing Next.js plugin and the `netlify/functions` directory configuration.
3. Visit the homepage with tracking allowed, then open `/dashboard` and enter the access key. Click Refresh data after new visits. The key stays in React memory and is cleared when you lock/reload the dashboard; it is never stored in browser storage.
4. Disable both enable flags and redeploy to stop tracking. Rotate the server-side token to revoke existing dashboard access.

No deployment or environment-variable changes are performed by creating these files. Live tracking begins only after activation and deployment. No historical traffic can be recovered.

## What is collected

One event for each supported page navigation (`/` and `/blog/...`), with a random event ID, anonymous visitor and session IDs, UTC day, page path without query strings or fragments, referral category (not referrer URL), coarse device type, and Netlify's approximate city/country/coordinates rounded to one decimal place. The application does not save IP addresses, precise device location, full user-agent strings, or referrer URLs. Netlify handles the request and geolocation at its infrastructure layer.

Identifiers use sessionStorage, not cookies or permanent localStorage. A new tab/browser storage reset may count as a new visitor. Sessions reset after 30 minutes between navigations. Reports also split sessions at UTC midnight or a location change. Unique visitor counts are deduplicated across the chosen period. Missing geolocation is retained as Unknown, never plotted at a fabricated coordinate.

Dashboard visits are excluded. Do Not Track and Global Privacy Control opt out. Blocked scripts, short visits, disabled storage, or delivery failures can cause undercounting. Device and referral categories are heuristic. Collection is best-effort, not a billing-grade measurement.

## Storage and protection

Netlify Blobs stores events under UTC-day/event-ID keys, isolated by deploy context. Create-only writes deduplicate retried event IDs without shared-counter races. Endpoint validation, same-origin checks, platform rate limits, and constant-time hashed key comparison protect the entry points. Origin checks and rate limits reduce abuse; a public collector cannot guarantee that every request is a human visitor.

A daily scheduled function removes events older than 30 days (up to roughly 31 days retained until the next run). Stats read only the most recent 30 UTC dates. Ensure scheduled functions are deployed and running. The small-site implementation reads individual events, with an explicit 20,000-event query limit; move to pre-aggregated storage/provider analytics for larger volumes. Platform function/runtime and storage quotas still apply.

## Checks and local development

`npm run build` checks all TypeScript and statically exports the page. `npm run test:analytics` exercises deduplication, date filtering, unknown locations, and access-key/payload validation. Netlify Dev or a deployed site is needed to test Blobs, geo context, platform rate limits, and the retention schedule end to end.

## Sources

- Netlify Functions geo context and rate-limit configuration: https://docs.netlify.com/build/functions/api/
- Netlify Blobs storage and conditional writes: https://docs.netlify.com/build/data-and-storage/netlify-blobs/
- World map: Natural Earth 1:110m country boundaries, distributed by World Atlas 2.0.2: https://github.com/topojson/world-atlas
- Map generation: `python3 scripts/build-world-map.py /path/to/countries-110m.json`. The SVG is bundled locally; visitors do not contact an external map service.
