'use client';

import { useState } from 'react';

const perspectives = [
  { label: 'Connect ideas', title: 'Good ideas rarely live alone.', description: 'Explore the threads between what you read, save, and think. A new perspective could be hiding in something you already know.', note: 'An unexpected connection', insight: 'The best tools make space for thinking.', sources: ['Tools for thought', 'A quieter internet', 'Designing for curiosity'] },
  { label: 'Explore knowledge', title: 'Follow your curiosity further.', description: 'Start with a question. Move between related ideas, revisit their context, and give your thinking room to evolve.', note: 'A question worth exploring', insight: 'What would software built around curiosity look like?', sources: ['Working notes', 'Questions without answers', 'The creative process'] },
  { label: 'Discover together', title: 'Different minds. Shared discovery.', description: 'Our vision extends beyond individual knowledge: finding new insights through the ideas people choose to contribute.', note: 'A collective perspective', insight: 'Shared knowledge can reveal what one perspective misses.', sources: ['Collective intelligence', 'Learning in the open', 'Connected perspectives'] },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <span aria-hidden="true">{diagonal ? '↗' : '↗'}</span>; }
function Mark({ small = false }: { small?: boolean }) { return <span className={`brand-mark ${small ? 'small' : ''}`} aria-hidden="true"><i /><i /><i /></span>; }

function KnowledgeMap() {
  return <div className="knowledge-map" role="img" aria-label="An illustrative map of connected notes on creativity, tools for thought, and collective intelligence">
    <div className="map-grid" />
    <svg className="connections" viewBox="0 0 620 500" fill="none" aria-hidden="true">
      <path d="M310 246C310 135 120 180 120 110M310 246C390 230 475 150 480 100M310 246C410 246 490 320 510 355M310 246C220 246 180 350 135 375M310 246C300 310 325 375 340 425M120 110C230 40 375 40 480 100M135 375C270 440 385 435 510 355" />
      <circle cx="310" cy="246" r="111" strokeDasharray="3 8" /><circle cx="310" cy="246" r="180" strokeDasharray="2 10" />
    </svg>
    <div className="map-label">A LITTLE CONTEXT. A NEW CONNECTION.</div>
    <div className="map-note note-one"><span className="note-symbol">✳</span><small>SAVED IDEA</small><strong>Tools for thought</strong><p>Software that grows<br />with the way we think.</p><div className="note-tags">research <span>·</span> 4 connections</div></div>
    <div className="map-note note-two"><span className="note-symbol">⌘</span><small>EXPLORATION</small><strong>The creative process</strong><div className="mini-lines"><i /><i /><i /></div></div>
    <div className="map-core"><Mark /><span>Your knowledge,<br /><b>coming together.</b></span></div>
    <div className="map-note note-three"><span className="note-symbol">◎</span><small>NEW PERSPECTIVE</small><strong>Collective intelligence</strong><p>What can we discover<br />when we think together?</p></div>
    <div className="map-note note-four"><span className="green-dot" /><span>A connection worth exploring</span><span>↗</span></div>
    <span className="map-spark spark-one" /><span className="map-spark spark-two" /><span className="map-spark spark-three" />
    <div className="map-caption"><span className="green-dot" /> An illustration of our vision</div>
  </div>;
}

export default function Page() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const perspective = perspectives[active];
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header container">
      <a href="#" className="brand" aria-label="Malleable Software home"><Mark small /><span>malleable<span className="brand-sub">software</span></span></a>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav">{menuOpen ? 'Close' : 'Menu'} <span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
      <nav id="main-nav" className={menuOpen ? 'navigation open' : 'navigation'} aria-label="Main navigation"><a href="#vision" onClick={() => setMenuOpen(false)}>Our vision</a><a href="#possibilities" onClick={() => setMenuOpen(false)}>Possibilities</a><a href="#about" onClick={() => setMenuOpen(false)}>About us</a></nav>
      <a className="header-contact" href="mailto:reach@malleablesoft.com">Let’s connect <Arrow /></a>
    </header>
    <main id="main">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="eyebrow"><span className="green-dot" /> INDEPENDENT MINDS. CONNECTED IDEAS.</div><h1 id="hero-title">Knowledge.<br />Made <em>malleable.</em></h1><p>Your ideas deserve more than a place to live.<br className="desktop-break" /> They deserve room to grow.</p><p className="hero-description">We’re building AI-powered tools to connect personal knowledge and uncover insights together.</p><div className="hero-actions"><a className="button primary" href="#vision">Explore our vision <Arrow /></a><a className="text-link" href="mailto:reach@malleablesoft.com">Get in touch <Arrow /></a></div><div className="hero-footnote"><span className="tiny-cross">+</span> Built for the way your mind moves.</div></div>
        <KnowledgeMap />
      </section>
      <div className="principles container"><span>A NEW WAY TO THINK WITH TECHNOLOGY</span><div>Human curiosity <b>+</b> Personal knowledge <b>+</b> Collective insight</div><span className="principle-star" aria-hidden="true">✳</span></div>
      <section className="vision container section" id="vision" aria-labelledby="vision-title"><div className="section-heading"><span className="eyebrow">01 / OUR VISION</span><h2 id="vision-title">Less information overload.<br /><span>More moments of clarity.</span></h2><p>Knowledge isn’t static. It changes as we learn, question, and connect. We believe our software should do the same.</p></div>
        <div className="vision-cards"><article><div className="card-art art-collect" aria-hidden="true"><div /><div /><div /><span>+</span></div><span className="card-number">01</span><h3>A home for your thinking</h3><p>An approach to personal knowledge that starts with your ideas, your context, and your curiosity.</p></article><article><div className="card-art art-connect" aria-hidden="true"><i /><i /><i /><i /><div>✳</div></div><span className="card-number">02</span><h3>Connections that matter</h3><p>AI as a thinking partner. Helping surface relationships and perspectives that invite a closer look.</p></article><article><div className="card-art art-discover" aria-hidden="true"><div /><div /><div /><span>↗</span></div><span className="card-number">03</span><h3>Insight beyond the individual</h3><p>A future where contributed knowledge opens new paths to understanding, together.</p></article></div>
      </section>
      <section className="possibilities section" id="possibilities" aria-labelledby="possibilities-title"><div className="container"><div className="section-top"><span className="eyebrow">02 / THE POSSIBILITIES</span><span className="small-muted">A glimpse of what we’re working toward</span></div><div className="perspective-tabs" aria-label="Explore possibilities">{perspectives.map((item, index) => <button key={item.label} aria-pressed={index === active} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.label}<Arrow /></button>)}</div><div className="perspective-content"><div><h2 id="possibilities-title">{perspective.title}</h2><p>{perspective.description}</p><a className="text-link" href="mailto:reach@malleablesoft.com?subject=Let%E2%80%99s%20talk%20about%20Malleable">Build the conversation with us <Arrow /></a></div><div className="insight-demo"><div className="insight-top"><Mark small /><span>CONNECTED THINKING</span><span>✧</span></div><div className="insight-body"><span className="eyebrow">{perspective.note}</span><h3>{perspective.insight}</h3><div className="insight-sources">{perspective.sources.map((source, i) => <span key={source}><b>0{i + 1}</b>{source}<Arrow /></span>)}</div></div><div className="demo-caption">ILLUSTRATIVE CONCEPT · NOT A PRODUCT SCREENSHOT</div></div></div></div></section>
      <section className="about container section" id="about" aria-labelledby="about-title"><div><span className="eyebrow">03 / ABOUT MALLEABLE</span><h2 id="about-title">Small team.<br /><span>Expansive thinking.</span></h2></div><div className="about-copy"><p>We’re Malleable Software, a company in Cupertino, California exploring the intersection of AI, personal knowledge, and collective discovery.</p><p>Our starting point is simple: technology should help us make more of what we know. We’re building toward that future, one connection at a time.</p><span className="location"><span className="green-dot" /> Cupertino, California <span>37.3230° N · 122.0322° W</span></span></div></section>
      <section className="contact container" aria-labelledby="contact-title"><div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div><div className="eyebrow">THE NEXT CONNECTION STARTS HERE</div><h2 id="contact-title">Let’s shape<br />what comes <em>next.</em></h2><a className="button primary" href="mailto:reach@malleablesoft.com">Say hello <Arrow /></a><a className="contact-email" href="mailto:reach@malleablesoft.com">reach@malleablesoft.com</a></section>
    </main>
    <footer className="footer container"><a className="brand" href="#"><Mark small /><span>malleable<span className="brand-sub">software</span></span></a><span>© {new Date().getFullYear()} Malleable Software LLC</span><a href="#main">Back to top ↑</a></footer>
  </>;
}
