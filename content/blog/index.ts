import { connectedKnowledge } from './connected-knowledge';
import { inspectableAi } from './inspectable-ai';
import { smallExperiments } from './small-experiments';
import type { BlogPost } from './types';

export const posts: BlogPost[] = [connectedKnowledge, inspectableAi, smallExperiments]
  .sort((a, b) => b.date.localeCompare(a.date));

export function readingMinutes(post: BlogPost) {
  const text = post.sections.map(section => [section.heading, ...section.paragraphs, section.code ?? ''].join(' ')).join(' ');
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
