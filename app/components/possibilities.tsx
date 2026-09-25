'use client';

import { KeyboardEvent, useRef, useState } from 'react';
import { Mark } from './brand-mark';
import { ArrowUpRight } from './icons';

const perspectives = [
  { label: 'Connect ideas', title: 'Good ideas rarely live alone.', description: 'Explore the threads between what you read, save, and think. A new perspective could be hiding in something you already know.', note: 'An unexpected connection', insight: 'The best tools make space for thinking.', sources: ['Tools for thought', 'A quieter internet', 'Designing for curiosity'] },
  { label: 'Explore knowledge', title: 'Follow your curiosity further.', description: 'Start with a question. Move between related ideas, revisit their context, and give your thinking room to evolve.', note: 'A question worth exploring', insight: 'What would software built around curiosity look like?', sources: ['Working notes', 'Questions without answers', 'The creative process'] },
  { label: 'Discover together', title: 'Different minds. Shared discovery.', description: 'Our vision extends beyond individual knowledge: finding new insights through the ideas people choose to contribute.', note: 'A collective perspective', insight: 'Shared knowledge can reveal what one perspective misses.', sources: ['Collective intelligence', 'Learning in the open', 'Connected perspectives'] },
];

export function Possibilities() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = perspectives[active];
  // WAI-ARIA tabs pattern: arrows move between tabs, Home/End jump to the ends.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = perspectives.length - 1;
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };
  return <div className="possibilities-body">
    <div className="tabs" role="tablist" aria-label="Explore possibilities" onKeyDown={onKeyDown}>
      {perspectives.map((item, index) => <button key={item.label} ref={el => { tabRefs.current[index] = el; }} role="tab" id={`tab-${index}`} tabIndex={index === active ? 0 : -1} aria-selected={index === active} aria-controls="possibility-panel" onClick={() => setActive(index)}>
        <span className="tab-index">0{index + 1}</span>{item.label}
      </button>)}
    </div>
    <div className="possibility" id="possibility-panel" role="tabpanel" tabIndex={0} aria-labelledby={`tab-${active}`}>
      <div className="possibility-copy">
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <a className="text-link" href="#contact">Shape this with us <ArrowUpRight /></a>
      </div>
      <div className="insight-card" key={active}>
        <div className="insight-card-top"><Mark small /><span>Connected thinking</span></div>
        <div className="insight-card-body">
          <span className="insight-kicker"><span className="pulse" /> {p.note}</span>
          <h4>{p.insight}</h4>
          <ul>{p.sources.map((source, i) => <li key={source}><b>0{i + 1}</b>{source}<ArrowUpRight /></li>)}</ul>
        </div>
        <div className="insight-card-caption">Illustrative concept · not a product screenshot</div>
      </div>
    </div>
  </div>;
}
