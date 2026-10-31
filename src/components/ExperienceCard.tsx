import { Link } from 'react-router-dom';
import type { Experience } from '../data/portfolioData';

export default function ExperienceCard({ item, detailed = false, initiallyOpen = false }: {
  item: Experience;
  detailed?: boolean;
  initiallyOpen?: boolean;
}) {
  const id = `experience-${item.id}`;

  return <details id={detailed ? id : undefined} tabIndex={detailed ? -1 : undefined} open={initiallyOpen}>
    <summary>
      <span className="nova-experience-accordion__label">
        <strong>{item.organization}</strong>
        <span>{item.position}</span>
      </span>
      <span className="nova-experience-accordion__icon" aria-hidden="true">+</span>
    </summary>
    <div>
      <p>{item.summary}</p>
      {detailed ? <>
        {item.contributions.length > 0 && <ul className="nova-story-list">{item.contributions.map((item) => <li key={item}>{item}</li>)}</ul>}
        {item.technologies.length > 0 && <ul className="nova-technology-list" aria-label="Technologies">{item.technologies.map((item) => <li key={item}>{item}</li>)}</ul>}
      </> : <Link className="nova-inline-link" to={`/experience#${id}`}>View experience <span aria-hidden="true">→</span></Link>}
    </div>
  </details>;
}
