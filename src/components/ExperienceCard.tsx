import { Link } from 'react-router-dom';
import type { Experience, Project } from '../data/portfolioData';

export default function ExperienceCard({ item, projects = [], detailed = false, initiallyOpen = false }: {
  item: Experience;
  projects?: Project[];
  detailed?: boolean;
  initiallyOpen?: boolean;
}) {
  const id = `experience-${item.id}`;
  const hasDetails = Boolean(item.timeline || item.location);

  return <details id={detailed ? id : undefined} tabIndex={detailed ? -1 : undefined} open={initiallyOpen}>
    <summary>
      <span className="nova-experience-accordion__label">
        <strong>{item.position}</strong>
        <span>{item.organization}</span>
        {hasDetails && <span className="nova-experience-accordion__meta">{[item.timeline, item.location].filter(Boolean).join(' · ')}</span>}
      </span>
      <span className="nova-experience-accordion__icon" aria-hidden="true">+</span>
    </summary>
    <div>
      <p>{item.summary}</p>
      {!!projects.length && <div className="nova-related-projects">
        <p className="nova-related-projects__label">Related projects</p>
        <ul className="nova-related-records nova-related-records--projects">{projects.map((project) => <li key={project.id}>
          <Link to={`/projects/${project.slug}`}>{project.title}<span aria-hidden="true"> ↗</span></Link>
        </li>)}</ul>
      </div>}
      {detailed ? <>
        {item.contributions.length > 0 && <ul className="nova-story-list">{item.contributions.map((item) => <li key={item}>{item}</li>)}</ul>}
        {item.technologies.length > 0 && <ul className="nova-technology-list" aria-label="Technologies">{item.technologies.map((item) => <li key={item}>{item}</li>)}</ul>}
      </> : <Link className="nova-inline-link" to={`/experience#${id}`}>View experience <span aria-hidden="true">→</span></Link>}
    </div>
  </details>;
}
