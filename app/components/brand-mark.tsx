/**
 * Brand logo. `light` (default) is the white wordmark for dark backgrounds;
 * `color` is the original blue wordmark for light backgrounds.
 */
export function Mark({ small = false, variant = 'light' }: { small?: boolean; variant?: 'light' | 'color' }) {
  const src = variant === 'light' ? '/malleable-logo-light.png' : '/malleable-logo.png';
  return <span className={`brand-mark ${small ? 'small' : ''}`} aria-hidden="true"><img src={src} alt="" width="1254" height="1254" /></span>;
}
