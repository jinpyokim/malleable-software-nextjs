import Link from 'next/link';
import { ArrowRight } from './components/icons';

export default function NotFound() {
  return <main id="main" className="container not-found">
    <div className="not-found-code" aria-hidden="true">404</div>
    <span className="eyebrow">Page not found</span>
    <h1>This connection doesn’t exist — <span className="gradient-text">yet.</span></h1>
    <p>The page you’re looking for may have moved, or the link may be incorrect.</p>
    <div className="hero-actions">
      <Link className="button primary" href="/">Back to home <ArrowRight /></Link>
      <Link className="button secondary" href="/#contact">Contact us</Link>
    </div>
  </main>;
}
