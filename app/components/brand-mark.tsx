export function Mark({ small = false }: { small?: boolean }) {
  return <span className={`brand-mark ${small ? 'small' : ''}`} aria-hidden="true"><img src="/malleable-logo.png" alt="" width="1254" height="1254" /></span>;
}
