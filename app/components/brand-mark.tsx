/**
 * Brand logo. Renders both wordmarks and lets CSS pick the one for the active theme:
 * white wordmark on dark backgrounds, original blue wordmark on light backgrounds.
 */
export function Mark({ small = false }: { small?: boolean }) {
  return <span className={`brand-mark ${small ? 'small' : ''}`} aria-hidden="true">
    <img className="logo-light" src="/malleable-logo-light.png" alt="" width="1254" height="1254" />
    <img className="logo-color" src="/malleable-logo.png" alt="" width="1254" height="1254" />
  </span>;
}
