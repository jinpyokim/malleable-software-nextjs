'use client';

import Link from 'next/link';
import { useState } from 'react';

type PostSummary = {
  slug: string; title: string; description: string; category: string;
  date: string; dateLabel: string; minutes: number; sample?: boolean;
};

export function BlogList({ posts }: { posts: PostSummary[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All posts');
  const categories = ['All posts', ...new Set(posts.map(post => post.category))];
  const visible = posts.filter(post => (category === 'All posts' || post.category === category) &&
    `${post.title} ${post.description} ${post.category}`.toLowerCase().includes(query.trim().toLowerCase()));

  return <section className="blog-library" aria-label="Articles">
    <div className="blog-controls">
      <div className="blog-filters" aria-label="Filter by topic">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <label className="blog-search"><span>Search articles</span><input type="search" placeholder="Search by title or topic…" value={query} onChange={event => setQuery(event.target.value)} /></label>
    </div>
    <p className="blog-count" role="status">{visible.length} {visible.length === 1 ? 'article' : 'articles'}</p>
    <div className="blog-grid">{visible.map((post, index) => <article className="blog-card" key={post.slug}>
      <Link href={`/blog/${post.slug}`} className="blog-card-link">
        <div className={`blog-art blog-art-${posts.indexOf(post) % 3}`} aria-hidden="true"><div className="blog-art-orbit" /><div className="blog-art-orbit" /><div className="blog-art-orbit" /><span>{['⌘', '✧', '↗'][posts.indexOf(post) % 3]}</span><small>FIELD NOTES / {String(index + 1).padStart(2, '0')}</small></div>
        <div className="blog-card-body"><div className="blog-card-meta"><span>{post.category}</span>{post.sample && <span className="sample-badge">Sample</span>}</div><h2>{post.title}</h2><p>{post.description}</p><div className="blog-card-bottom"><span><time dateTime={post.date}>{post.dateLabel}</time> · {post.minutes} min read</span><span aria-hidden="true">↗</span></div></div>
      </Link>
    </article>)}</div>
    {visible.length === 0 && <div className="blog-empty"><h2>No articles found.</h2><p>Try another search or browse all topics.</p><button className="button primary" onClick={() => { setQuery(''); setCategory('All posts'); }}>Show all articles</button></div>}
  </section>;
}
