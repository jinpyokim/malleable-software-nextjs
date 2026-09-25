type IconProps = { className?: string };
const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

export const ArrowRight = ({ className }: IconProps) => <svg {...base} width={16} height={16} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const ArrowUpRight = ({ className }: IconProps) => <svg {...base} width={16} height={16} className={className}><path d="M7 17 17 7M8 7h9v9" /></svg>;
export const Check = ({ className }: IconProps) => <svg {...base} width={18} height={18} className={className}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;

export const IconSpark = ({ className }: IconProps) => <svg {...base} className={className}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></svg>;
export const IconLayers = ({ className }: IconProps) => <svg {...base} className={className}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></svg>;
export const IconNodes = ({ className }: IconProps) => <svg {...base} className={className}><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="7" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8.3 7.2 15.6 7M7.3 8.2l3.6 7.6M16.9 9.2l-3.7 6.8" /></svg>;
export const IconUsers = ({ className }: IconProps) => <svg {...base} className={className}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5.5 6-5.5s5.4 2.1 6 5.5" /><path d="M15.5 5.2a3 3 0 0 1 0 5.6M18 14.8c1.6.8 2.7 2.6 3 5.2" /></svg>;
export const IconCompass = ({ className }: IconProps) => <svg {...base} className={className}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></svg>;
export const IconEye = ({ className }: IconProps) => <svg {...base} className={className}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.8" /></svg>;
export const IconShield = ({ className }: IconProps) => <svg {...base} className={className}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6L12 3Z" /><path d="m9 12 2 2 4-4" /></svg>;
export const IconHand = ({ className }: IconProps) => <svg {...base} className={className}><path d="M8 11V5.5a1.5 1.5 0 0 1 3 0V10M11 10V4.5a1.5 1.5 0 0 1 3 0V10M14 10V6a1.5 1.5 0 0 1 3 0v7.5c0 4-2.7 7-6.5 7-2.6 0-4.3-1.4-5.6-3.6L3.4 14a1.5 1.5 0 0 1 2.5-1.6L8 15" /></svg>;
export const IconShape = ({ className }: IconProps) => <svg {...base} className={className}><path d="M4 16c2-6 5-9 8-9s4 3 4 5-1 3-3 3-3-2-2-4 4-5 9-5" /></svg>;
export const IconMail = ({ className }: IconProps) => <svg {...base} className={className}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></svg>;
export const IconPin = ({ className }: IconProps) => <svg {...base} className={className}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>;
