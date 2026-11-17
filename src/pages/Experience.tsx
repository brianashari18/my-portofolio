import { useLocation } from 'react-router-dom';
import ExperienceCard from '../components/ExperienceCard';
import PageIntro from '../components/PageIntro';
import { usePortfolioContent } from '../context/usePortfolioContent';
import { groupExperiences } from '../lib/groupExperiences';

export default function Experience() {
  const { content: { experiences, projects } } = usePortfolioContent();
  const { hash } = useLocation();
  const selected = experiences.find((item) => hash === `#experience-${item.id}`) ?? experiences[0];
  const groups = groupExperiences(experiences);
  const sections = [
    { id: 'professional-experience', title: 'Professional experience', items: groups.professional },
    { id: 'organization-experience', title: 'Organization experience', items: groups.organization },
  ].filter((section) => section.items.length > 0);

  return <div className="nova-page nova-experience-page page-shell">
    <PageIntro title="Experience">Professional roles alongside university and student-organization work.</PageIntro>
    <div className="nova-experience-groups">
      {sections.map(({ id, title, items }) => <section className="nova-experience-group" key={id} aria-labelledby={id}>
        <header className="nova-experience-group__heading">
          <h2 id={id}>{title}</h2>
          <span>{items.length} {items.length === 1 ? 'role' : 'roles'}</span>
        </header>
        <div className="nova-experience-accordion nova-experience-accordion--full" aria-label={title} data-nova-sequence="soft">
          {items.map((item) => <ExperienceCard key={`${item.id}:${selected?.id === item.id}`} item={item} projects={projects.filter((project) => project.experienceIds?.includes(item.id))} initiallyOpen={selected?.id === item.id} detailed />)}
        </div>
      </section>)}
    </div>
  </div>;
}
