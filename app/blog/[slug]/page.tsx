import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts, readingMinutes, formatDate } from '../../../content/blog';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return posts.map(post => ({ slug: post.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find(item => item.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — Malleable Blog`, description: post.description };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find(item => item.slug === slug);
  if (!post) notFound();
  const related = posts.filter(item => item.slug !== slug).slice(0, 2);
  return <main id="main" className="container article-page">
    <Link href="/blog" className="blog-back">← All articles</Link>
    <article>
      <header className="article-heading"><div className="eyebrow">{post.category}</div><h1>{post.title}</h1><p className="article-deck">{post.description}</p><div className="article-byline"><span>{post.author}</span><time dateTime={post.date}>{formatDate(post.date)}</time><span>{readingMinutes(post)} min read</span></div></header>
      {post.sample && <aside className="blog-sample-notice">Sample article — illustrative content for this website template, not a report of shipped features or company research.</aside>}
      <div className="article-layout"><aside className="article-toc"><nav aria-label="On this page"><span>ON THIS PAGE</span>{post.sections.map((section, index) => <a key={section.heading} href={`#section-${index + 1}`}>{section.heading}</a>)}</nav></aside>
        <div className="article-body">{post.sections.map((section, index) => <section key={section.heading} id={`section-${index + 1}`}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.code && <pre tabIndex={0} aria-label={`${section.heading} code example`}><code>{section.code}</code></pre>}</section>)}<Link className="text-link" href="/blog">← Back to all articles</Link></div>
      </div>
    </article>
    {related.length > 0 && <section className="blog-related" aria-labelledby="related-title"><h2 id="related-title">Keep exploring.</h2><div>{related.map(item => <Link key={item.slug} href={`/blog/${item.slug}`}><span>{item.category}</span><h3>{item.title} <span aria-hidden="true">↗</span></h3></Link>)}</div></section>}
  </main>;
}
