import { useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ProjectImageDialog from '../components/ProjectImageDialog';
import ProjectArtwork from '../components/ProjectArtwork';
import ProjectWorkflowMap from '../components/ProjectWorkflowMap';
import { usePortfolioContent } from '../context/usePortfolioContent';
import { defaultPortfolioContent } from '../data/portfolioData';
import type { Project, ProjectGalleryImage } from '../data/portfolioData';
import { getDefaultProjectImageFrame, getProjectGalleryImage, resolvePortfolioImage } from '../lib/resolvePortfolioImage';
import NotFound from './NotFound';

interface StorySection {
  id: string;
  title: string;
  content: ReactNode;
  dark?: boolean;
  wide?: boolean;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { content: { projects } } = usePortfolioContent();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound />;

  const category = project.categories.find((item) => item === searchParams.get('category'));
  const sequence = category ? projects.filter((item) => item.categories.includes(category)) : projects;
  const index = sequence.indexOf(project);
  const search = category ? new URLSearchParams({ category }).toString() : '';
  const previous = sequence[(index - 1 + sequence.length) % sequence.length];
  const next = sequence[(index + 1) % sequence.length];

  return <ProjectCase key={project.slug} project={project} search={search}
    previous={sequence.length > 1 ? previous : undefined} next={sequence.length > 1 ? next : undefined} />;
}

function ProjectCase({ project, search, previous, next }: { project: Project; search: string; previous?: Project; next?: Project }) {
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const imageTrigger = useRef<HTMLButtonElement | null>(null);
  const gallery = new Map<string, ProjectGalleryImage>();
  for (const image of project.gallery ?? []) {
    const src = resolvePortfolioImage(image.src);
    if (src && !gallery.has(src)) gallery.set(src, getProjectGalleryImage(project, image, src));
  }
  const defaultFrame = getDefaultProjectImageFrame(project.platforms);
  for (const source of [project.heroImage, project.thumbnail]) {
    const src = resolvePortfolioImage(source);
    if (src && !gallery.has(src)) gallery.set(src, { src, alt: `${project.title} project preview`, ...defaultFrame });
  }
  const images = [...gallery.values()].map((image, index) => ({
    ...image,
    title: image.title?.trim() || `Screen ${String(index + 1).padStart(2, '0')}`,
  }));
  const coverSource = resolvePortfolioImage(project.thumbnail) ?? resolvePortfolioImage(project.heroImage) ?? images[0]?.src;
  const heroIndex = images.findIndex(({ src }) => src === coverSource);
  const hero = heroIndex >= 0 ? images[heroIndex] : undefined;
  const diagram = resolvePortfolioImage(project.architecture?.diagram);
  const bundledWorkflow = defaultPortfolioContent.projects.find((item) => item.id === project.id)?.workflow;
  const workflow = project.workflow
    ? { ...bundledWorkflow, ...project.workflow, rationale: project.workflow.rationale ?? bundledWorkflow?.rationale }
    : bundledWorkflow;
  const sections: StorySection[] = [];

  const rationale = project.problem?.trim() ? project.problem : workflow?.rationale;
  if (rationale) sections.push({ id: 'challenge', title: 'Why this project exists', content: <p>{rationale}</p> });
  if (project.solution) sections.push({ id: 'approach', title: 'The approach', content: <p>{project.solution}</p> });
  if ((project.role && project.role !== 'College project') || project.contributions?.length) sections.push({
    id: 'contribution', title: 'My role',
    content: <>
      {project.role && project.role !== 'College project' && <p className="nova-case-role">{project.role}</p>}
      {project.contributions?.length ? <ul className="nova-story-list">{project.contributions.map((item) => <li key={item}>{item}</li>)}</ul> : null}
    </>,
  });
  if (workflow) sections.push({
    id: 'workflow', title: 'How it works', wide: true,
    content: <ProjectWorkflowMap workflow={workflow} />,
  });
  if (project.features?.length) sections.push({
    id: 'features', title: 'What it does',
    content: <ul className="nova-feature-list">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>,
  });
  if (images.length > 1) sections.push({
    id: 'gallery',
    title: 'Product walkthrough',
    content: <div className="nova-case-gallery__grid">
      {images.map((image, index) => index === heroIndex ? null : <figure key={image.src}>
        <button className="nova-case-gallery__button" type="button" aria-haspopup="dialog" aria-label={`Open screen ${index + 1} of ${images.length}: ${image.title}`} onClick={(event) => openImage(index, event)}>
          <span className="nova-case-gallery__preview" data-gallery-tone={project.galleryTone}>
            <span className="nova-case-gallery__sequence">Screen {String(index + 1).padStart(2, '0')}</span>
            <ProjectArtwork image={image} decorative />
          </span>
          <span className="nova-case-gallery__label">
            <span>{image.title}</span><span aria-hidden="true">↗</span>
          </span>
        </button>
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>)}
    </div>,
  });
  if (project.architecture && (project.architecture.summary || diagram)) sections.push({
    id: 'implementation', title: 'Implementation', dark: true,
    content: <>
      {project.architecture.summary && <p>{project.architecture.summary}</p>}
      {diagram && <figure className="nova-case-diagram">
        <img src={diagram} alt={`${project.title} architecture diagram`} loading="lazy" />
        {project.architecture.caption && <figcaption>{project.architecture.caption}</figcaption>}
      </figure>}
    </>,
  });
  if (project.technologies.length) sections.push({
    id: 'technology', title: 'Technology',
    content: <ul className="nova-technology-list">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>,
  });
  const optionalSections = [
    { id: 'decisions', title: 'Engineering decisions', items: project.engineeringChallenges },
    { id: 'results', title: 'Results', items: project.results },
    { id: 'reflection', title: 'Reflection', items: project.reflections },
  ];
  for (const { id, title, items } of optionalSections) {
    if (!items?.length) continue;
    sections.push({ id, title, content: <ul className="nova-story-list">{items.map((item) => <li key={item}>{item}</li>)}</ul> });
  }

  function openImage(index: number, event: MouseEvent<HTMLButtonElement>) {
    imageTrigger.current = event.currentTarget;
    setImageIndex(index);
  }

  return <article className="nova-case page-shell">
    <nav className="nova-breadcrumb" aria-label="Breadcrumb">
      <Link to={{ pathname: '/projects', search }}>← {search ? 'Filtered projects' : 'All projects'}</Link>
      <span aria-hidden="true">/</span><span aria-current="page">{project.title}</span>
    </nav>
    <header className="nova-case__intro" data-nova-enter-sequence>
      <p className="nova-kicker">{project.categories.join(' · ')}</p>
      <h1>{project.title}<span className="nova-period" aria-hidden="true">.</span></h1>
      <p>{project.tagline}</p>
    </header>
    <dl className="nova-case__facts">
      {project.platforms.length > 0 && <div><dt>Platform</dt><dd>{project.platforms.join(' · ')}</dd></div>}
      {project.role && <div><dt>{project.role === 'College project' ? 'Project context' : 'Role'}</dt><dd>{project.role}</dd></div>}
      {project.status && <div><dt>Status</dt><dd>{project.status}</dd></div>}
      {!!project.technologies.length && <div><dt>Tools</dt><dd>{project.technologies.slice(0, 3).join(' · ')}</dd></div>}
    </dl>

    <section className={`nova-case-stage nova-case-stage--${project.slug}${hero ? '' : ' nova-case-stage--text'}`} data-gallery-tone={project.galleryTone} aria-labelledby="project-overview">
      <div className="nova-case-stage__copy">
        <h2 id="project-overview">Overview</h2>
        <p>{project.description}</p>
      </div>
      {hero && <figure className="nova-case-stage__image">
        <button className="nova-case-image-button" type="button" aria-haspopup="dialog" aria-label={`Open cover, screen ${heroIndex + 1} of ${images.length}: ${hero.title}`} onClick={(event) => openImage(heroIndex, event)}>
          <ProjectArtwork image={hero} loading="eager" />
          <span className="nova-case-image-button__action">View image <span aria-hidden="true">↗</span></span>
        </button>
        {(images.length > 1 || hero.title || hero.caption) && <figcaption>
          {images.length > 1 && <span className="nova-case-stage__sequence">Cover · Screen {String(heroIndex + 1).padStart(2, '0')} of {String(images.length).padStart(2, '0')}</span>}
          {hero.title && <strong>{hero.title}</strong>}
          {hero.caption && <span>{hero.caption}</span>}
        </figcaption>}
      </figure>}
    </section>

    {sections.length > 0 && <div className="nova-case__story">
      {sections.length > 1 && <nav className="nova-case__contents" aria-label="In this case study">
        <p className="nova-kicker">In this case study</p>
        {sections.map(({ id, title }) => <Link key={id} to={{ hash: `#${id}`, search }}>{title}</Link>)}
      </nav>}
      <div>
        {sections.map(({ id, title, content, dark, wide }) => <section key={id} id={id} tabIndex={-1} className={`nova-case-section${dark ? ' nova-case-section--dark' : ''}${wide ? ' nova-case-section--wide' : ''}`}>
          <h2>{title}</h2>
          <div className={`nova-case-section__content${wide ? ' nova-case-section__content--wide' : ''}`}>{content}</div>
        </section>)}
      </div>
    </div>}

    {!!project.links?.length && <div className="nova-case__links">
      {project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}
    </div>}
    {previous && next && <nav className="nova-case-pagination" aria-label="More projects">
      <Link to={{ pathname: `/projects/${previous.slug}`, search }}><span>Previous project</span><strong>← {previous.title}</strong></Link>
      <Link to={{ pathname: `/projects/${next.slug}`, search }}><span>Next project</span><strong>{next.title} →</strong></Link>
    </nav>}
    {imageIndex !== null && images.length > 0 && <ProjectImageDialog images={images} index={Math.min(imageIndex, images.length - 1)} onChange={setImageIndex} onClose={() => {
      setImageIndex(null);
      imageTrigger.current?.focus({ preventScroll: true });
    }} />}
  </article>;
}
