import type { Metadata } from 'next';

// Keep the entire blog out of search results until it is ready to launch.
// Allow crawling so search engines can read this noindex directive.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
