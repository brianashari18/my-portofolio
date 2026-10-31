import type { ReactNode } from 'react';

export default function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return <header className="nova-page-intro" data-nova-enter-sequence>
    <h1>{title}<span className="nova-period" aria-hidden="true">.</span></h1>
    {children && <p>{children}</p>}
  </header>;
}
