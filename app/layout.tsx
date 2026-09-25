import type { Metadata, Viewport } from 'next';
import './globals.css';
import './styles/pages.css';
import { VisitorTracker } from './components/visitor-tracker';
import { SiteHeader } from './components/site-header';
import { SiteFooter } from './components/site-footer';
import { contactEmail, siteUrl } from './site-config';

const title = 'Malleable Software — Knowledge, made malleable';
const description = 'Malleable Software builds AI-powered tools for connected thinking — helping people connect personal knowledge and discover insights together.';
const ogImage = { url: '/og-image.png', width: 1200, height: 630, alt: 'Malleable Software — Knowledge, made malleable.' };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: 'Malleable Software',
  icons: { icon: '/favicon.svg' },
  openGraph: { title, description, type: 'website', siteName: 'Malleable Software', locale: 'en_US', images: [ogImage] },
  twitter: { card: 'summary_large_image', title, description, images: [ogImage.url] },
};

export const viewport: Viewport = { themeColor: '#060e1a' };

// Structured data so search engines can show accurate company details.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Malleable Software',
      legalName: 'Malleable Software LLC',
      url: siteUrl,
      logo: `${siteUrl}/malleable-logo.png`,
      email: contactEmail,
      description,
      address: { '@type': 'PostalAddress', addressLocality: 'Cupertino', addressRegion: 'CA', addressCountry: 'US' },
    },
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: 'Malleable Software', publisher: { '@id': `${siteUrl}/#organization` } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <VisitorTracker />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
