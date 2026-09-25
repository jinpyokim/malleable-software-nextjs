import type { BlogPost } from './types';

export const inspectableAi: BlogPost = {
  slug: 'making-ai-suggestions-inspectable',
  title: 'Making AI suggestions inspectable',
  description: 'An interface sketch that keeps a suggested connection close to its supporting material.',
  category: 'AI & design',
  date: '2026-09-23',
  author: 'Example article',
  sample: true,
  sections: [
    { heading: 'A suggestion is a starting point', paragraphs: ['Consider an assistant that proposes a relationship between two notes. A useful design question is what the reader needs to see before deciding whether that relationship is worth keeping.', 'In this example, the suggestion has three visible parts: the proposed relationship, a short explanation, and links to the original notes. The reader can inspect the material before accepting the connection.'] },
    { heading: 'Keep evidence within reach', paragraphs: ['Opening a source should preserve the current question. A side panel or an inline excerpt could let the reader compare the suggestion with the source without navigating away.', 'An excerpt is still only part of a document. Give the reader a direct route to the full source, and make it clear where the quoted material ends and the generated interpretation begins.'] },
    { heading: 'Make disagreement useful', paragraphs: ['Acceptance should not be the only available action. Someone may want to dismiss a connection, change its explanation, or save it as a question for later.', 'A prototype can begin with these three actions and a handful of example suggestions. Watch where readers ask for more context: those moments help identify what the interface needs to expose.'] },
  ],
};
