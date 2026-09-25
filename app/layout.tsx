import type { Metadata, Viewport } from 'next';
import './globals.css';
import './styles/pages.css';
import { VisitorTracker } from './components/visitor-tracker';
import { SiteHeader } from './components/site-header';
import { SiteFooter } from './components/site-footer';

const title = 'Malleable Software — Knowledge, made malleable';
const description = 'Malleable Software builds AI-powered tools for connected thinking — helping people connect personal knowledge and discover insights together.';

export const metadata: Metadata = {
  metadataBase: new URL('https://malleablesoft.com'),
  title,
  description,
  applicationName: 'Malleable Software',
  icons: { icon: '/favicon.svg' },
  openGraph: { title, description, type: 'website', siteName: 'Malleable Software', images: ['/malleable-logo.png'] },
  twitter: { card: 'summary', title, description },
};

export const viewport: Viewport = { themeColor: '#060e1a' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <VisitorTracker />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
