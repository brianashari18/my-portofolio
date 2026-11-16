import { Link } from 'react-router-dom';
import ActionLink from '../components/ActionLink';
import ExperienceCard from '../components/ExperienceCard';
import ProjectCard from '../components/ProjectCard';
import SectionHeading from '../components/SectionHeading';
import { usePortfolioContent } from '../context/usePortfolioContent';
import type { ProjectCategory } from '../data/portfolioData';
import { groupExperiences } from '../lib/groupExperiences';
import { getProjectCover, resolvePortfolioImage } from '../lib/resolvePortfolioImage';
import { sortProjectsByTimelineNewestFirst } from '../lib/sortProjectsByTimeline';

const workAreas: { category: ProjectCategory; label: string }[] = [
  { category: 'iOS Development', label: 'Native iOS' },
  { category: 'AI / ML Engineering', label: 'Applied AI' },
  { category: 'Backend Engineering', label: 'Backend' },
  { category: 'Flutter Development', label: 'Flutter' },
];

export default function Home() {
  const { content: { experiences, personalInfo, projects, skillCategories } } = usePortfolioContent();
  const { professional: professionalExperiences } = groupExperiences(experiences);
  const featured = sortProjectsByTimelineNewestFirst(projects.filter((project) => project.featured));
  const illustrated = featured.filter((project) => getProjectCover(project));
  const mobileLead = illustrated.find((project) => project.categories.includes('iOS Development'));
  const crossFocusLead = illustrated.find((project) => project !== mobileLead
    && !project.categories.includes('iOS Development')
    && project.categories.some((category) => category === 'AI / ML Engineering' || category === 'Backend Engineering'));
  const showcase: typeof featured = [];
  if (mobileLead) showcase.push(mobileLead);
  if (crossFocusLead && !showcase.includes(crossFocusLead)) showcase.push(crossFocusLead);
  for (const project of [...illustrated, ...featured]) {
    if (!showcase.includes(project)) showcase.push(project);
  }
  showcase.splice(2);
  const otherFeatured = featured.filter((project) => !showcase.includes(project));
  const portrait = resolvePortfolioImage(personalInfo.profileImage);
  const title = personalInfo.title.match(/^(.+?) (specializing in .+)$/);
  const projectCounts = workAreas.map((area) => ({
    ...area,
    count: projects.filter((project) => project.categories.includes(area.category)).length,
  })).filter(({ count }) => count > 0);

  return <>
    <section className={`nova-hero page-shell${portrait ? '' : ' nova-hero--text'}`} aria-labelledby="home-title">
      <div className="nova-hero__copy">
        <div className="nova-hero__intro" data-nova-enter-sequence>
          <p className="nova-kicker">{personalInfo.name} · {personalInfo.location}</p>
          <h1 id="home-title">{title ? <>{title[1]} <span>{title[2]}</span></> : personalInfo.title}</h1>
          <p className="nova-hero__summary">{personalInfo.summary}</p>
          <div className="nova-hero__actions">
            <ActionLink to={showcase.length ? '/#selected-work' : '/projects'} arrow="↓">Explore work</ActionLink>
            <ActionLink to="/experience" variant="outline" arrow={false}>View experience</ActionLink>
          </div>
        </div>
        {professionalExperiences.length > 0 && <div className="nova-proof" data-nova-enter>
          <span>Experience across</span>
          <ul>{professionalExperiences.slice(0, 3).map((item) => <li key={item.id}>{item.organization}</li>)}</ul>
        </div>}
      </div>
      {portrait && <figure className="nova-hero__portrait" data-nova-enter data-nova-media>
        <svg width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="nova-photo-blob" clipPathUnits="objectBoundingBox">
              <path d="M .22 .08 C .38 .02 .64 0 .84 .05 C .98 .09 1.02 .2 .98 .38 C .96 .52 .86 .58 .74 .66 C .62 .74 .57 .9 .43 .97 C .29 1.04 .15 .93 .1 .78 C .05 .62 .02 .48 .1 .34 C .14 .26 .16 .16 .22 .08 Z" />
            </clipPath>
          </defs>
        </svg>
        <img src={portrait} alt={`Portrait of ${personalInfo.name}`} loading="eager" />
      </figure>}
    </section>

    {projectCounts.length > 0 && <nav className="nova-focus" aria-label="Browse projects by focus">
      <ul className="page-shell nova-focus__inner" data-nova-sequence="soft">
        {projectCounts.map(({ category, count, label }) => <li key={category}>
          <Link to={{ pathname: '/projects', search: new URLSearchParams({ category }).toString() }}>
            <strong>{label}</strong><span>{count} {count === 1 ? 'project' : 'projects'} <span aria-hidden="true">↗</span></span>
          </Link>
        </li>)}
      </ul>
    </nav>}

    {showcase.length > 0 && <section className="nova-section nova-work" id="selected-work" tabIndex={-1} aria-label="Selected work">
      <div className="page-shell">
        <SectionHeading title="Selected work" action={<Link className="nova-inline-link" to="/projects">View all projects <span aria-hidden="true">→</span></Link>} />
        <div className="nova-project-grid nova-project-grid--home" data-nova-sequence="soft" data-nova-media>
          {showcase.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
        {otherFeatured.length > 0 && <ul className="nova-work__more" aria-label="More selected projects">
          {otherFeatured.map((project) => <li key={project.id}>
            <Link to={`/projects/${project.slug}`}><strong>{project.title}</strong><span>{project.tagline}</span><span aria-hidden="true">↗</span></Link>
          </li>)}
        </ul>}
      </div>
    </section>}

    {professionalExperiences.length > 0 && <section className="nova-section nova-experience-preview" aria-label="Professional experience">
      <div className="page-shell nova-experience-preview__inner">
        <div data-nova-reveal>
          <h2>Professional experience</h2>
          <Link className="nova-inline-link" to="/experience">View full experience <span aria-hidden="true">→</span></Link>
        </div>
        <div className="nova-experience-accordion" data-nova-sequence="soft">
          {professionalExperiences.map((item, index) => <ExperienceCard key={item.id} item={item} initiallyOpen={index === 0} />)}
        </div>
      </div>
    </section>}

    {skillCategories.length > 0 && <section className="nova-section nova-capabilities" aria-label="Technical capabilities">
      <div className="page-shell">
        <SectionHeading title="Technical capabilities" action={<Link className="nova-inline-link" to="/about#skills">See skills and evidence <span aria-hidden="true">→</span></Link>} />
        <div className="nova-capabilities__list" data-nova-sequence="soft">
          {skillCategories.map((category, index) => <Link className="nova-capability" key={category.name} to={`/about#skills-${index + 1}`}>
            <span className="nova-capability__arrow" aria-hidden="true">↗</span>
            <div>
              <h3>{category.name}</h3>
              <p>{category.skills.filter((skill) => skill.evidence !== 'Exploring').slice(0, 5).map((skill) => skill.name).join(' · ')}</p>
            </div>
          </Link>)}
        </div>
      </div>
    </section>}
  </>;
}
