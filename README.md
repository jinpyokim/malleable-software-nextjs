# Malleable Software

A minimalist single-page landing site built with Next.js, featuring a clean black background with elegant white typography. This landing page showcases Malleable Software, a company innovating in personal knowledge management with AI.

## Features

- **Minimalist Design**: Clean, centered layout with black background and white text
- **Responsive**: Fully responsive design that works on all devices
- **Static Export**: Configured for static HTML export for optimal performance
- **TypeScript**: Built with TypeScript for type safety
- **Next.js 16**: Utilizes the latest Next.js App Router architecture
- **SEO Optimized**: Includes proper metadata and semantic HTML

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) ^16.0.0 (App Router)
- **UI Library**: [React](https://react.dev/) 18.2.0
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.9.3
- **Styling**: Plain CSS with modern layout techniques

## Project Structure

```
malleable-software-nextjs/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main landing page
│   └── globals.css     # Global styles (minimalist theme)
├── public/
│   ├── favicon.svg     # Site favicon
│   └── robots.txt      # SEO configuration
├── next.config.js      # Next.js configuration (static export enabled)
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository or extract the project files:

```bash
mkdir malleable-software-nextjs && cd malleable-software-nextjs
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server on http://localhost:3000
- `npm run build` - Build the application for production (generates static HTML)
- `npm start` - Start the production server (for testing the build)
- `npm run lint` - Run ESLint to check code quality

## Build & Deployment

This project is configured for static HTML export, making it easy to deploy to any static hosting service.

### Build for Production

```bash
npm run build
```

This generates an `out/` directory with static HTML files ready for deployment.

### Deployment Options

**Recommended Platforms:**
- [Vercel](https://vercel.com/) - Optimal for Next.js projects
- [Netlify](https://www.netlify.com/) - Easy static site hosting
- [GitHub Pages](https://pages.github.com/) - Free hosting for public repos
- Any static file hosting service

### Deploy to Vercel

The easiest way to deploy is using Vercel:

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Customization

### Content

Edit the main content in `app/page.tsx`:
- Company name and tagline
- Contact information
- Footer text

### Styling

Modify `app/globals.css` to customize:
- Colors (currently black background, white text)
- Font sizes (currently using small 14px base)
- Typography (system font stack)
- Layout spacing

### Metadata

Update SEO metadata in `app/layout.tsx`:
- Page title
- Meta description
- Other metadata fields

### Favicon

Replace `public/favicon.svg` with your own logo or icon.

## Design Philosophy

This landing page follows a minimalist design approach:
- **Black background (#000)** for a clean, modern look
- **White text (#fff)** for maximum contrast and readability
- **Small typography (14px base)** for elegance
- **System fonts** for fast loading and native feel
- **Centered layout** for focus and simplicity
- **Responsive design** that adapts to all screen sizes

## License

© 2025 Malleable Software LLC. All rights reserved.

## Contact

- **Location**: Cupertino, CA
- **Email**: [reach@malleablesoft.com](mailto:reach@malleablesoft.com)

---

Built with Next.js and deployed with care.
