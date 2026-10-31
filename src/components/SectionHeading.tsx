import type { ReactNode } from 'react';

export default function SectionHeading({ eyebrow, title, children, action }: { eyebrow?: string; title: string; children?: ReactNode; action?: ReactNode }) {
  return <div className="nova-section-heading" data-nova-sequence="soft">
    <div>{eyebrow && <p className="nova-kicker">{eyebrow}</p>}<h2>{title}</h2></div>
    {(children || action) && <div className="nova-section-heading__aside">{children}{action}</div>}
  </div>;
}
