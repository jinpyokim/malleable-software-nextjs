import type { BlogPost } from './types';

export const smallExperiments: BlogPost = {
  slug: 'small-experiments-for-thinking-tools',
  title: 'Small experiments for thinking tools',
  description: 'A practical way to turn a broad product idea into a focused prototype and a question you can investigate.',
  category: 'Engineering',
  date: '2026-09-22',
  author: 'Example article',
  sample: true,
  sections: [
    { heading: 'Choose one question', paragraphs: ['A prototype does not need to demonstrate an entire product. Imagine starting with a single question: can someone understand why two saved notes were connected?', 'That question suggests a narrow scope. Show two notes, a proposed connection, and the underlying sources. Leave importing, account management, and large collections outside this particular experiment.'] },
    { heading: 'Keep the experiment repeatable', paragraphs: ['Use a fixed set of example notes so you can compare different interface versions against the same material. Record which version was shown and which task the person attempted.', 'A short observation log can distinguish what happened from your interpretation. “Opened both sources before accepting” is an observation; “did not trust the suggestion” is an interpretation that may need a follow-up question.'] },
    { heading: 'Decide what to change next', paragraphs: ['After the session, return to the original question. Did the explanation help? Was important context missing? Did the person describe the relationship in their own words?', 'Use those observations to choose the next small change. The goal of this example is a clearer decision about the interface, rather than a larger demo.'] },
  ],
};
