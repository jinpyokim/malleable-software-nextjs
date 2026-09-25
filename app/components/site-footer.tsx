import Link from 'next/link';
import { Mark } from './brand-mark';
import { contactEmail, mailto, primaryNav, showBlogNavigation } from '../site-config';

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link className="brand" href="/" aria-label="Malleable Software home"><Mark small /></Link>
          <p>AI-powered tools for connected thinking — helping people make more of what they know.</p>
        </div>
        <nav className="footer-col" aria-label="Company">
          <h2>Company</h2>
          {primaryNav.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          {showBlogNavigation && <Link href="/blog">Blog</Link>}
        </nav>
        <nav className="footer-col" aria-label="Get involved">
          <h2>Get involved</h2>
          <Link href="/#contact">Early access</Link>
          <a href={mailto('Partnership inquiry')}>Partnerships</a>
          <a href={mailto('Investor inquiry')}>Investors</a>
          <a href={mailto('Press inquiry')}>Press</a>
        </nav>
        <div className="footer-col">
          <h2>Contact</h2>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <span>Cupertino, California</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Malleable Software LLC. All rights reserved.</span>
        <a href="#main">Back to top ↑</a>
      </div>
    </div>
  </footer>;
}
