import type { Metadata } from 'next';
import Link from 'next/link';
import { contactEmail } from '../site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy — Malleable Software',
  description: 'How Malleable Software collects, uses, and protects information when you visit our website or request early access.',
  alternates: { canonical: '/privacy' },
};

const lastUpdated = 'September 24, 2026';

export default function PrivacyPage() {
  return <main id="main" className="container legal-page">
    <header className="legal-heading">
      <span className="eyebrow">Legal</span>
      <h1>Privacy Policy</h1>
      <p>Last updated {lastUpdated}</p>
    </header>
    <div className="legal-body">
      <p className="legal-lede">Malleable Software LLC (“Malleable,” “we,” “us”) respects your privacy. This policy explains what information we collect through malleablesoft.com, how we use it, and the choices you have. We keep collection to the minimum needed to run the website and stay in touch with people who ask us to.</p>

      <section><h2>Information you give us</h2>
        <p>When you request early access, we collect the email address you provide and, if you choose to share them, your name and a short note about your interests. When you email us, we receive your email address and whatever you include in your message.</p>
        <p>We use this information only to respond to you, to contact you about early access to Malleable, and to understand what people would like our tools to help with.</p>
      </section>

      <section><h2>Information collected automatically</h2>
        <p>If website analytics are enabled, we record simple, privacy-friendly page-view statistics. For each page view we store:</p>
        <ul>
          <li>the page visited (for example, the home page or a blog article), and whether an early-access request was submitted;</li>
          <li>a random visitor ID and session ID, generated in your browser and kept in session storage (not cookies), which let us count visits without identifying you;</li>
          <li>the general type of traffic source (direct, search, social, or referral) and device type (desktop, mobile, or tablet);</li>
          <li>an approximate location — city, country, and coordinates rounded to roughly 10 km — derived by our hosting provider from your connection. We do not store your IP address in our analytics.</li>
        </ul>
        <p>We do not use advertising trackers or third-party analytics cookies. If your browser sends a Do Not Track or Global Privacy Control signal, we do not record analytics for your visit. Analytics records are automatically deleted after 30 days.</p>
      </section>

      <section><h2>How we share information</h2>
        <p>We do not sell or rent your personal information. We share it only with service providers that help us operate the website — such as our hosting provider, Netlify, which processes form submissions and serves the site — and only as needed to provide those services. We may also disclose information if required by law.</p>
      </section>

      <section><h2>How long we keep it</h2>
        <p>Early-access requests and emails are kept until you ask us to delete them or until we no longer need them for the purposes above. Analytics records are deleted after 30 days.</p>
      </section>

      <section><h2>Your choices</h2>
        <p>You can ask us to access, correct, or delete the information you have given us, or stop contacting you, at any time by emailing <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Depending on where you live, you may have additional rights under local law; we will honor requests as required.</p>
      </section>

      <section><h2>Children</h2>
        <p>Our website is not directed to children under 13, and we do not knowingly collect personal information from them.</p>
      </section>

      <section><h2>Changes to this policy</h2>
        <p>We may update this policy as our website and products evolve. When we do, we will revise the “last updated” date above.</p>
      </section>

      <section><h2>Contact</h2>
        <p>Malleable Software LLC · Cupertino, California<br /><a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
      </section>

      <Link className="text-link" href="/">← Back to home</Link>
    </div>
  </main>;
}
