'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Mark } from './brand-mark';
import { ArrowRight } from './icons';
import { primaryNav, showBlogNavigation } from '../site-config';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const blogActive = pathname.startsWith('/blog');
  const links = [...primaryNav, ...(showBlogNavigation ? [{ href: '/blog', label: 'Blog' }] : [])];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setMenuOpen(false);
  return <header className={`site-header${scrolled || menuOpen ? ' is-scrolled' : ''}`}>
    <div className="container header-inner">
      <Link href="/" className="brand" aria-label="Malleable Software home" onClick={close}><Mark small /></Link>
      <nav id="main-nav" className={menuOpen ? 'navigation open' : 'navigation'} aria-label="Main navigation" onKeyDown={event => { if (event.key === 'Escape') close(); }}>
        {links.map(link => <Link key={link.href} href={link.href} aria-current={link.href === '/blog' && blogActive ? 'page' : undefined} onClick={close}>{link.label}</Link>)}
        <Link className="button primary nav-mobile-cta" href="/#contact" onClick={close}>Request early access <ArrowRight /></Link>
      </nav>
      <div className="header-actions">
        <Link className="header-link" href="/#contact">Contact</Link>
        <Link className="button primary button-sm" href="/#contact">Request early access</Link>
      </div>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
        <span className={menuOpen ? 'burger open' : 'burger'} aria-hidden="true"><i /><i /></span>
      </button>
    </div>
  </header>;
}
