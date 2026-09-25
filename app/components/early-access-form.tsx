'use client';

import { FormEvent, useState } from 'react';
import { contactEmail, mailto } from '../site-config';
import { ArrowRight, Check } from './icons';
import { trackEvent } from './visitor-tracker';

type Status = 'idle' | 'sending' | 'done' | 'error';

/**
 * Submits to Netlify Forms (declared in public/__forms.html so Netlify detects it at deploy time).
 * If submission fails (e.g. local dev), visitors get a pre-filled email link instead.
 */
export function EarlyAccessForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('company-website')) return; // honeypot
    setStatus('sending');
    try {
      const res = await fetch('/__forms.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data as unknown as Record<string, string>).toString() });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('done');
      trackEvent('/early-access/submitted');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') return <div className="form-success" role="status"><span className="success-icon"><Check /></span><div><strong>You’re on the list.</strong><p>Thanks for your interest — we’ll be in touch as we open early access.</p></div></div>;

  return <form className="access-form" name="early-access" onSubmit={submit}>
    <input type="hidden" name="form-name" value="early-access" />
    <label className="visually-hidden">Leave this empty <input name="company-website" tabIndex={-1} autoComplete="off" /></label>
    <div className="field-row">
      <label className="field"><span>Name</span><input name="name" autoComplete="name" placeholder="Ada Lovelace" /></label>
      <label className="field"><span>Work or personal email</span><input name="email" type="email" required autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} /></label>
    </div>
    <label className="field"><span>What would you like to think better about? <em className="optional">Optional</em></span><input name="interest" placeholder="Research, writing, learning, a team knowledge base…" /></label>
    <button className="button primary button-block" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : <>Request early access <ArrowRight /></>}</button>
    {status === 'error' && <p className="form-error" role="alert">We couldn’t submit the form just now. <a href={mailto(`Early access request${email ? ` — ${email}` : ''}`)}>Email us at {contactEmail}</a> instead.</p>}
    <p className="form-note">No spam. We’ll only email you about Malleable early access. See our <a href="/privacy">privacy policy</a>.</p>
  </form>;
}
