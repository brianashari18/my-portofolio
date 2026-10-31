import { useId } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/portfolioData';
import ProjectArtwork from './ProjectArtwork';
import { getProjectCoverImage } from '../lib/resolvePortfolioImage';

export default function ProjectCard({ project, variant = 'feature', search = '' }: {
  project: Project;
  variant?: 'feature' | 'row';
  search?: string;
}) {
  const titleId = useId();
  const image = getProjectCoverImage(project);
  const showMedia = variant === 'feature' || !!image;

  return <article className={`nova-project nova-project--${variant} nova-project--${project.slug}${image ? '' : ' nova-project--text'}`}>
    <Link className="nova-project__link" to={{ pathname: `/projects/${project.slug}`, search }} aria-labelledby={titleId}>
      {showMedia && <div className={`nova-project__media${image ? '' : ' nova-project__media--text'}${image?.frame === 'phone' ? ' nova-project__media--device' : ''}`} data-gallery-tone={project.galleryTone}>
        {image && <ProjectArtwork image={image} decorative />}
        <div className="nova-project__media-overlay">
          {variant === 'feature' && <h3 id={titleId} className="nova-project__media-title">{project.title}</h3>}
          <span className="nova-project__arrow" aria-hidden="true"><span className="nova-project__arrow-track"><span>↗</span><span>↗</span></span></span>
        </div>
      </div>}
      <div className="nova-project__details">
        <div className="nova-project__meta"><span>{project.platforms.join(' · ')}</span><span>{project.role ?? project.categories[0]}</span></div>
        {variant === 'row' && <h3 id={titleId}>{project.title}</h3>}
        <p>{project.tagline}</p>
        <ul className="nova-project__tech" aria-label={`${project.title} technologies`}>
          {project.technologies.slice(0, 3).map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </div>
      {!showMedia && <span className="nova-project__arrow" aria-hidden="true">↗</span>}
    </Link>
  </article>;
}
