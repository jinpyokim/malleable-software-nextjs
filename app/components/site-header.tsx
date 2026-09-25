'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Mark } from './brand-mark';
import { showBlogNavigation } from '../site-config';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const blogActive = pathname.startsWith('/blog');
  const links = [
    { href: '/#vision', label: 'Our vision' },
    { href: '/#possibilities', label: 'Possibilities' },
    { href: '/#about', label: 'About us' },
    ...(showBlogNavigation ? [{ href: '/blog', label: 'Blog' }] : []),
  ];
  return <header className="header container">
    <Link href="/" className="brand" aria-label="Malleable Software home" onClick={() => setMenuOpen(false)}><Mark small /></Link>
    <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav">{menuOpen ? 'Close' : 'Menu'} <span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
    <nav id="main-nav" className={menuOpen ? 'navigation open' : 'navigation'} aria-label="Main navigation" onKeyDown={event => { if (event.key === 'Escape') setMenuOpen(false); }}>
      {links.map(link => <Link key={link.href} href={link.href} aria-current={link.href === '/blog' && blogActive ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{link.label}</Link>)}
    </nav>
    <a className="header-contact" href="mailto:reach@malleablesoft.com">Let’s connect <span aria-hidden="true">↗</span></a>
  </header>;
}
