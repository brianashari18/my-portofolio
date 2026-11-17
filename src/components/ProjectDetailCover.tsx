import type { MouseEvent } from 'react';
import type { Project, ProjectGalleryImage } from '../data/portfolioData';
import ProjectArtwork from './ProjectArtwork';

export default function ProjectDetailCover({ project, images, onOpen }: {
  project: Project;
  images: ProjectGalleryImage[];
  onOpen: (index: number, event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const featuredImages = images.slice(0, 4);
  const details = [
    project.timeline && { label: 'Timeline', value: project.timeline },
    project.role && { label: project.role === 'College project' || project.role === 'Course project' ? 'Project context' : 'Role', value: project.role },
    project.location && { label: 'Location', value: project.location },
    project.platforms.length > 0 && { label: 'Platform', value: project.platforms.join(' · ') },
    project.status && { label: 'Status', value: project.status },
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return <section className={`nova-detail-cover nova-detail-cover--${project.slug}`} data-gallery-tone={project.galleryTone} aria-labelledby="project-overview">
    <div className="nova-detail-cover__top">
      <div className="nova-detail-cover__identity">
        <p className="nova-detail-cover__eyebrow">{project.categories.join(' · ')}</p>
        <h1 id="project-overview">{project.title}<span className="nova-period" aria-hidden="true">.</span></h1>
        <p className="nova-detail-cover__tagline">{project.tagline}</p>
      </div>
      <div className="nova-detail-cover__summary">
        <p className="nova-detail-cover__label">Project overview</p>
        <p>{project.description}</p>
      </div>
    </div>

    {details.length > 0 && <dl className="nova-detail-cover__facts">
      {details.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
    </dl>}

    <div className={`nova-detail-cover__screens nova-detail-cover__screens--count-${featuredImages.length}`} aria-label={`${project.title} product screenshots`}>
      {featuredImages.length > 0 ? featuredImages.map((image, index) => <figure className={`nova-detail-cover__screen nova-detail-cover__screen--${image.frame ?? 'raw'}`} key={image.src}>
        <button type="button" aria-haspopup="dialog" aria-label={`Open ${image.title || `screen ${index + 1}`} screenshot`} onClick={(event) => onOpen(index, event)}>
          <ProjectArtwork image={image} decorative loading={index === 0 ? 'eager' : 'lazy'} />
          <span className="nova-detail-cover__screen-action" aria-hidden="true">↗</span>
        </button>
        <figcaption>{image.title}</figcaption>
      </figure>) : <div className="nova-detail-cover__empty-media" aria-label="Project screenshots will be added later">
        <span className="nova-detail-cover__empty-mark" aria-hidden="true">✳</span>
        <span>Project visuals</span>
        <strong>Screenshots will appear here</strong>
      </div>}
    </div>

    {(project.problem || project.features?.length) && <div className="nova-detail-cover__bottom">
      {project.problem && <div className="nova-detail-cover__problem">
        <p className="nova-detail-cover__label">The problem</p>
        <p>{project.problem}</p>
      </div>}
      {!!project.features?.length && <div className="nova-detail-cover__features">
        <p className="nova-detail-cover__label">Key features</p>
        <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
      </div>}
    </div>}

    {!!project.technologies.length && <ul className="nova-detail-cover__technology" aria-label="Technologies used">
      {project.technologies.slice(0, 8).map((technology) => <li key={technology}>{technology}</li>)}
    </ul>}
  </section>;
}
