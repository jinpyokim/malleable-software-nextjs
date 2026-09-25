import type { Metadata } from 'next';
import { posts, readingMinutes, formatDate } from '../../content/blog';
import { BlogList } from './blog-list';

export const metadata: Metadata = {
  title: 'Technical Blog — Malleable Software',
  description: 'Notes on AI, knowledge systems, and building tools for connected thinking.',
};

export default function BlogPage() {
  const summaries = posts.map(({ sections, author, ...post }) => ({ ...post, dateLabel: formatDate(post.date), minutes: readingMinutes({ ...post, sections, author }) }));
  return <main id="main" className="container blog-page">
    <header className="blog-heading"><div className="eyebrow"><span className="accent-dot" /> THE MALLEABLE BLOG</div><h1>Ideas in the making.<br /><em>Notes from the work.</em></h1><p>Exploring AI, knowledge systems, and the craft of building software that helps us think.</p></header>
    {posts.some(post => post.sample) && <div className="blog-sample-notice">This collection includes sample articles to preview the blog. Sample content is labeled on each article.</div>}
    <BlogList posts={summaries} />
  </main>;
}
