import { Mark } from './brand-mark';

const nodes = [
  { x: 18, y: 22, label: 'Tools for thought', kind: 'Saved idea' },
  { x: 80, y: 18, label: 'The creative process', kind: 'Exploration' },
  { x: 86, y: 68, label: 'Collective intelligence', kind: 'Perspective' },
  { x: 14, y: 70, label: 'Working notes', kind: 'Note' },
  { x: 50, y: 88, label: 'Designing for curiosity', kind: 'Reading' },
];

/** Decorative concept illustration for the hero — not a product screenshot. */
export function ConceptGraph() {
  return <figure className="concept" aria-label="Concept illustration: personal notes connected around a central idea, with an AI-suggested connection">
    <div className="concept-window">
      <div className="concept-bar" aria-hidden="true"><i /><i /><i /><span>connected-thinking</span><b>Concept</b></div>
      <div className="concept-canvas" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="concept-lines">
          <defs>
            <linearGradient id="edge" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#2699ff" /><stop offset=".55" stopColor="#25d7ec" /><stop offset="1" stopColor="#ffcf42" /></linearGradient>
          </defs>
          {nodes.map((node, i) => <line key={node.label} className={`l${i}`} x1="50" y1="48" x2={node.x} y2={node.y} />)}
          <path className="concept-suggested" d="M18 22 C 40 5, 75 35, 86 68" />
        </svg>
        <div className="concept-core"><Mark /><span>Your knowledge</span></div>
        {nodes.map((node, i) => <div key={node.label} className={`concept-node n${i}`} style={{ left: `${node.x}%`, top: `${node.y}%` }}><small>{node.kind}</small>{node.label}</div>)}
      </div>
      <div className="concept-insight">
        <span className="insight-kicker"><span className="pulse" /> Suggested connection</span>
        <p><b>Tools for thought</b> and <b>Collective intelligence</b> share a theme: thinking together.</p>
        <div className="insight-actions"><span>Explore</span><span>Why this?</span></div>
      </div>
    </div>
    <figcaption>Concept illustration · not a product screenshot</figcaption>
  </figure>;
}
