import './globals.css';
import { VisitorTracker } from './components/visitor-tracker';
import Link from 'next/link';
import { SiteHeader } from './components/site-header';
import { Mark } from './components/brand-mark';
import { showBlogNavigation } from './site-config';

export const metadata = {
  title: 'Malleable Software — Knowledge, made malleable',
  description: 'AI-powered tools for connected thinking. Malleable Software is exploring personal knowledge, human curiosity, and collective discovery.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <VisitorTracker />
        {children}
        <footer className="footer container">
          <Link className="brand" href="/" aria-label="Malleable Software home"><Mark small /></Link>
          <span>© {new Date().getFullYear()} Malleable Software LLC</span>
          {showBlogNavigation && <Link href="/blog">Blog</Link>}
          <a href="#main">Back to top ↑</a>
        </footer>
      </body>
    </html>
  );
}
