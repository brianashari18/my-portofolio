import { useId } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/portfolioData';
import { getProjectGalleryImages } from '../lib/resolvePortfolioImage';
import ProjectArtwork from './ProjectArtwork';

export default function ProjectCard({ project, variant = 'feature', search = '' }: {
  project: Project;
  variant?: 'feature' | 'row';
  search?: string;
}) {
  const titleId = useId();
  const images = getProjectGalleryImages(project).slice(0, 2);
  const isFeature = variant === 'feature';
  const platformLabel = project.platforms.join(' · ') || project.categories[0];
  const context = [project.timeline, project.location].filter(Boolean).join(' · ');

  return <article className={`nova-project nova-project--${variant} nova-project--${project.slug}`}>
    <Link className={`nova-project__link nova-project__link--${variant}`} to={{ pathname: `/projects/${project.slug}`, search }} aria-labelledby={titleId}>
      <span className={`nova-project__visual${images.length === 1 ? ' nova-project__visual--single' : ''}`} data-gallery-tone={project.galleryTone} aria-hidden="true">
        <span className="nova-project__visual-glow" />
        {images.length === 0 && <span className="nova-project__visual-placeholder">
          <span>{project.categories[0] ?? 'Selected project'}</span>
          <strong>{project.technologies.slice(0, 2).join(' · ') || 'Project overview'}</strong>
        </span>}
        {images.map((image, index) => <span className={`nova-project__screen nova-project__screen--${index === 0 ? 'primary' : 'secondary'} nova-project__screen--${image.frame ?? 'raw'}`} key={image.src}>
          <ProjectArtwork image={{ ...image, alt: '' }} decorative loading="lazy" />
        </span>)}
        {isFeature && <span className="nova-project__visual-arrow" aria-hidden="true"><span className="nova-project__arrow-track"><span>↗</span><span>↗</span></span></span>}
      </span>

      <span className={`nova-project__details nova-project__details--${variant}`}>
        <span className="nova-project__eyebrow">{isFeature ? 'Selected work' : platformLabel}</span>
        <strong className="nova-project__title" id={titleId}>{project.title}</strong>
        <span className="nova-project__tagline">{project.tagline}</span>
        {(isFeature || project.role) && <span className="nova-project__context">
          {isFeature && <span>{platformLabel}</span>}
          {project.role && <span>{project.role}</span>}
        </span>}
        {context && <span className="nova-project__context-detail">{context}</span>}
        <span className="nova-project__tech" aria-label={`${project.title} technologies`}>
          {project.technologies.slice(0, isFeature ? 3 : 2).map((technology) => <span key={technology}>{technology}</span>)}
        </span>
      </span>
      {!isFeature && <span className="nova-project__row-arrow" aria-hidden="true">↗</span>}
    </Link>
  </article>;
}
