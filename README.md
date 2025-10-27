# Malleable Software — Minimal Next.js Site

A single-page landing site built with Next.js (App Router), black background and small white text.

## Quickstart

```bash
# 1) scaffold
mkdir malleable-software-nextjs && cd $_

# 2) extract the ZIP you downloaded here

# 3) install & run
npm install
npm run dev
```

Then open the printed local URL.

## Build & deploy

```bash
npm run build
npm start
```

Deploy the `.next` production build to your preferred host (Vercel recommended).

## Customize
- Change the page title/description in `app/layout.tsx` (metadata export).
- Replace `public/favicon.svg` with your own logo.
- Styles live in `app/globals.css` for the minimalist look.
