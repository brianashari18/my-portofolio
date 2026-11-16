import { useSearchParams } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import PageIntro from '../components/PageIntro';
import { usePortfolioContent } from '../context/usePortfolioContent';
import { sortProjectsByTimelineNewestFirst } from '../lib/sortProjectsByTimeline';

export default function Projects() {
  const { content: { projects } } = usePortfolioContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = Array.from(new Set(projects.flatMap((project) => project.categories)));
  const activeCategory = categories.find((category) => category === searchParams.get('category'));
  const matching = activeCategory ? projects.filter((project) => project.categories.includes(activeCategory)) : projects;
  const featured = sortProjectsByTimelineNewestFirst(matching.filter((project) => project.featured));
  const additional = matching.filter((project) => !project.featured);
  const projectSearch = activeCategory ? new URLSearchParams({ category: activeCategory }).toString() : '';

  function selectCategory(category?: string) {
    const next = new URLSearchParams(searchParams);
    if (category) next.set('category', category);
    else next.delete('category');
    setSearchParams(next);
  }

  return <div className="nova-page nova-work-page page-shell">
    <PageIntro title="Projects">Browse native iOS apps, Flutter projects, and work across AI and backend engineering.</PageIntro>
    <div className="nova-filter-row" role="group" aria-label="Filter projects by category">
      <button className="nova-filter" type="button" aria-pressed={!activeCategory} onClick={() => selectCategory()}>All projects</button>
      {categories.map((category) => <button key={category} className="nova-filter" type="button" aria-pressed={activeCategory === category} onClick={() => selectCategory(category)}>{category}</button>)}
    </div>
    <p className="nova-filter-results" role="status">{matching.length} {matching.length === 1 ? 'project' : 'projects'}{activeCategory ? ` in ${activeCategory}` : ''}</p>
    {featured.length > 0 && <section className="nova-list-section" aria-labelledby="featured-heading">
      <div className="nova-list-section__heading"><h2 id="featured-heading">Selected work</h2></div>
      <div className="nova-project-grid">{featured.map((project) => <ProjectCard key={project.id} project={project} search={projectSearch} />)}</div>
    </section>}
    {additional.length > 0 && <section className="nova-list-section nova-list-section--archive" aria-labelledby="archive-heading">
      <div className="nova-list-section__heading"><h2 id="archive-heading">Project archive</h2></div>
      <div className="nova-archive-grid">{additional.map((project) => <ProjectCard key={project.id} project={project} variant="row" search={projectSearch} />)}</div>
    </section>}
    {matching.length === 0 && <p className="nova-empty">No projects in this category yet.</p>}
  </div>;
}
