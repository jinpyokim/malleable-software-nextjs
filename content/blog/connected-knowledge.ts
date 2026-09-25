import type { BlogPost } from './types';

export const connectedKnowledge: BlogPost = {
  slug: 'designing-for-connected-knowledge',
  title: 'Designing for connected knowledge',
  description: 'A small data model for ideas, their sources, and the relationships that make them useful.',
  category: 'Knowledge systems',
  date: '2026-09-24',
  author: 'Example article',
  sample: true,
  sections: [
    { heading: 'Start with the source', paragraphs: ['Imagine a notebook that stores more than the text you highlight. Each saved idea also carries its source, the date you saved it, and a short explanation of why it mattered. These details give future you a way to reconstruct the original context.', 'For this example, we can represent an idea with a small, explicit record. The source is optional because an original thought may not come from a document.'], code: 'type Idea = {\n  id: string;\n  text: string;\n  sourceUrl?: string;\n  savedAt: string;\n  context: string;\n};' },
    { heading: 'Give relationships a reason', paragraphs: ['A connection is more useful when it explains itself. Instead of storing only two identifiers, a relationship could include a reason: these ideas disagree, share an example, or explore the same question.', 'Keep the origin of the relationship explicit. A link suggested by software and a link deliberately added by a person represent different kinds of evidence. The interface should let the reader distinguish them.'] },
    { heading: 'Design for revision', paragraphs: ['Ideas evolve. A useful interface should let someone revise a note, remove a relationship, or return to the source without losing their place.', 'A first prototype could be deliberately small: save a few notes, connect two of them, and revisit that connection a week later. The question is whether the context still helps you think.'] },
  ],
};
