import type { MetadataRoute } from 'next';
import { posts } from '../content/blog';
import { showBlogNavigation, siteUrl } from './site-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
  ];
  // Blog pages are listed only once the blog is public.
  if (showBlogNavigation) {
    pages.push({ url: `${siteUrl}/blog`, changeFrequency: 'weekly', priority: 0.7 });
    for (const post of posts.filter(p => !p.sample)) pages.push({ url: `${siteUrl}/blog/${post.slug}`, lastModified: post.date, priority: 0.6 });
  }
  return pages;
}
