// Enable when the AI blog writer is ready for launch.
export const showBlogNavigation = false;

export const contactEmail = 'reach@malleablesoft.com';
export const mailto = (subject: string) => `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;

export const primaryNav = [
  { href: '/#vision', label: 'Vision' },
  { href: '/#approach', label: 'Approach' },
  { href: '/#principles', label: 'Principles' },
  { href: '/#company', label: 'Company' },
];

// Canonical site URL — used for sitemap, robots, social previews, and structured data.
export const siteUrl = 'https://malleablesoft.com';
