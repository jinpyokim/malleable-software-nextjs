# Publishing a technical article

The blog lives at `/blog`. Each article has its own `/blog/<slug>` URL and is generated during `npm run build`, so the existing static hosting setup continues to work.

1. Copy an article file in this directory, such as `connected-knowledge.ts`.
2. Give its export a unique name. Set a unique, URL-safe `slug`, title, description, category, ISO date (`YYYY-MM-DD`), and author.
3. Replace the sections with your article. Each section has a heading, an array of paragraphs, and an optional plain-text `code` block. Content is rendered as text, not raw HTML.
4. Remove `sample: true` when the article is ready to publish.
5. Import the article in `index.ts` and add it to the `posts` array. Only articles in that array are published. Categories and newest-first ordering update automatically.
6. Run `npm run build` and deploy the generated `out/` directory through your usual hosting process.

The three included articles are explicitly labeled samples. Replace or remove them before using the blog for actual company posts. The sample notice on the blog index automatically disappears when no sample articles remain.

No CMS, account, or database is required. To save a draft, keep its file out of the `posts` array until it is ready.

## Search visibility before launch

`app/blog/layout.tsx` applies `noindex, follow` to the blog listing and every article. The pages remain accessible by direct URL, but search engines are instructed not to index them. Keep blog crawling allowed in `robots.txt` so crawlers can read the directive.

When launching, replace or remove sample articles, remove the temporary `noindex` policy from the blog layout, and enable `showBlogNavigation` in `app/site-config.ts`. Rebuild and deploy; search engines must recrawl the pages before their listings change.
