import { ConceptGraph } from './components/concept-graph';
import { EarlyAccessForm } from './components/early-access-form';
import { Possibilities } from './components/possibilities';
import { ArrowRight, ArrowUpRight, IconCompass, IconEye, IconHand, IconLayers, IconMail, IconNodes, IconPin, IconShape, IconShield, IconSpark, IconUsers } from './components/icons';
import { contactEmail, mailto } from './site-config';

const pillars = [
  { icon: IconSpark, title: 'Human curiosity', text: 'Tools that start with your questions, not an algorithm’s.' },
  { icon: IconLayers, title: 'Personal knowledge', text: 'Your ideas, your context, and your way of thinking.' },
  { icon: IconUsers, title: 'Collective insight', text: 'What we can discover when knowledge is shared.' },
];

const vision = [
  { icon: IconLayers, title: 'A home for your thinking', text: 'An approach to personal knowledge that starts with your ideas, your context, and your curiosity.' },
  { icon: IconNodes, title: 'Connections that matter', text: 'AI as a thinking partner — helping surface relationships and perspectives that invite a closer look.' },
  { icon: IconCompass, title: 'Insight beyond the individual', text: 'A future where contributed knowledge opens new paths to understanding, together.' },
];

const steps = [
  { title: 'Gather', text: 'Bring together what you read, save, and think — kept in the context where it made sense to you.' },
  { title: 'Connect', text: 'AI helps surface threads between ideas, so relationships you might have missed come into view.' },
  { title: 'Discover', text: 'Knowledge people choose to contribute reveals perspectives no single mind would find alone.' },
];

const principles = [
  { icon: IconHand, title: 'Human in the loop', text: 'AI suggests. You decide. Our tools are built to support judgment, not replace it.' },
  { icon: IconEye, title: 'Inspectable by design', text: 'Every suggestion should show where it came from, so you can trust — and question — it.' },
  { icon: IconShield, title: 'Your knowledge, yours', text: 'What you capture belongs to you. Sharing is always a choice you make.' },
  { icon: IconShape, title: 'Built to evolve', text: 'Knowledge isn’t static. Software that thinks with you should be malleable too.' },
];

export default function Page() {
  return <main id="main">
    {/* Hero */}
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <a className="pill" href="#vision"><span className="pill-tag">AI · Knowledge</span>Independent minds. Connected ideas. <ArrowRight /></a>
          <h1 id="hero-title">Knowledge,<br />made <span className="gradient-text">malleable.</span></h1>
          <p className="lede">We’re building AI-powered tools that help people connect personal knowledge — and uncover insights together.</p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">Request early access <ArrowRight /></a>
            <a className="button secondary" href="#vision">Explore our vision</a>
          </div>
          <p className="hero-meta"><IconPin /> Malleable Software · Cupertino, California</p>
        </div>
        <ConceptGraph />
      </div>
    </section>

    {/* Pillars */}
    <section className="pillars" aria-label="What we bring together">
      <div className="container pillars-grid">
        {pillars.map(({ icon: Icon, title, text }, i) => <div className="pillar" key={title}>
          <span className="icon-badge"><Icon /></span>
          <div><h2>{title}</h2><p>{text}</p></div>
          {i < pillars.length - 1 && <span className="pillar-plus" aria-hidden="true">+</span>}
        </div>)}
      </div>
    </section>

    {/* Vision */}
    <section className="section" id="vision" aria-labelledby="vision-title">
      <div className="container">
        <header className="section-header">
          <span className="eyebrow">Our vision</span>
          <h2 id="vision-title">Less information overload.<br /><span className="dim">More moments of clarity.</span></h2>
          <p>Knowledge isn’t static. It changes as we learn, question, and connect. We believe the software we use to think should do the same.</p>
        </header>
        <div className="card-grid three">
          {vision.map(({ icon: Icon, title, text }, i) => <article className="card" key={title}>
            <div className="card-head"><span className="icon-badge"><Icon /></span><span className="card-index">0{i + 1}</span></div>
            <h3>{title}</h3><p>{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    {/* Approach */}
    <section className="section section-alt" id="approach" aria-labelledby="approach-title">
      <div className="container">
        <header className="section-header center">
          <span className="eyebrow">Our approach</span>
          <h2 id="approach-title">From scattered notes<br /><span className="dim">to shared understanding.</span></h2>
          <p>We’re exploring how AI can help knowledge move — from a single idea, to a web of connections, to insight that’s bigger than any one of us.</p>
        </header>
        <ol className="steps">
          {steps.map((step, i) => <li key={step.title} className="step">
            <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3><p>{step.text}</p>
          </li>)}
        </ol>
        <div className="possibilities" id="possibilities">
          <div className="subsection-head"><span className="eyebrow">The possibilities</span><span className="muted-sm">A glimpse of what we’re working toward</span></div>
          <Possibilities />
        </div>
      </div>
    </section>

    {/* Principles */}
    <section className="section" id="principles" aria-labelledby="principles-title">
      <div className="container principles-layout">
        <header className="section-header sticky">
          <span className="eyebrow">Principles</span>
          <h2 id="principles-title">AI that earns<br /><span className="dim">your trust.</span></h2>
          <p>The way we build matters as much as what we build. These commitments guide every decision we make.</p>
          <a className="text-link" href={mailto('Let’s talk about Malleable')}>Talk with our team <ArrowUpRight /></a>
        </header>
        <div className="card-grid two">
          {principles.map(({ icon: Icon, title, text }) => <article className="card" key={title}>
            <span className="icon-badge"><Icon /></span><h3>{title}</h3><p>{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    {/* Company */}
    <section className="section section-alt" id="company" aria-labelledby="company-title">
      <div className="container company">
        <div>
          <span className="eyebrow">About Malleable</span>
          <h2 id="company-title">Small team.<br /><span className="dim">Expansive thinking.</span></h2>
          <p className="company-lede">We’re Malleable Software, a company in Cupertino, California exploring the intersection of AI, personal knowledge, and collective discovery.</p>
          <p>Our starting point is simple: technology should help us make more of what we know. We’re building toward that future, one connection at a time.</p>
        </div>
        <dl className="facts">
          <div><dt>Headquarters</dt><dd>Cupertino, California</dd></div>
          <div><dt>Focus</dt><dd>AI · Personal knowledge · Collective discovery</dd></div>
          <div><dt>Company</dt><dd>Malleable Software LLC</dd></div>
          <div><dt>Contact</dt><dd><a href={`mailto:${contactEmail}`}>{contactEmail}</a></dd></div>
        </dl>
      </div>
    </section>

    {/* Contact / CTA */}
    <section className="section cta" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <header className="section-header center">
          <span className="eyebrow">Get involved</span>
          <h2 id="contact-title">Let’s shape what comes <span className="gradient-text">next.</span></h2>
          <p>Whether you want to try what we’re building or build it with us, we’d love to hear from you.</p>
        </header>
        <div className="cta-grid">
          <div className="cta-card featured">
            <span className="cta-label">For early adopters</span>
            <h3>Request early access</h3>
            <p>Be among the first to try Malleable and help shape it with your feedback.</p>
            <EarlyAccessForm />
          </div>
          <div className="cta-card">
            <span className="cta-label">For partners &amp; investors</span>
            <h3>Start a conversation</h3>
            <p>We’re looking to connect with researchers, partners, and investors who share our vision for human-centered AI.</p>
            <ul className="cta-links">
              <li><a href={mailto('Partnership inquiry')}><span><strong>Partnerships</strong><small>Research and product collaborations</small></span><ArrowUpRight /></a></li>
              <li><a href={mailto('Investor inquiry')}><span><strong>Investors</strong><small>Learn about our vision and plans</small></span><ArrowUpRight /></a></li>
              <li><a href={mailto('Press inquiry')}><span><strong>Press &amp; general</strong><small>Everything else</small></span><ArrowUpRight /></a></li>
            </ul>
            <a className="cta-email" href={`mailto:${contactEmail}`}><IconMail /> {contactEmail}</a>
          </div>
        </div>
      </div>
    </section>
  </main>;
}
