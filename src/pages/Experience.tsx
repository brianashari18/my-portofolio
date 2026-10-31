import { useLocation } from 'react-router-dom';
import ExperienceCard from '../components/ExperienceCard';
import PageIntro from '../components/PageIntro';
import { usePortfolioContent } from '../context/usePortfolioContent';

export default function Experience() {
  const { content: { experiences } } = usePortfolioContent();
  const { hash } = useLocation();
  const selected = experiences.find((item) => hash === `#experience-${item.id}`) ?? experiences[0];

  return <div className="nova-page nova-experience-page page-shell">
    <PageIntro title="Experience">Native iOS development, applied AI workflows, and business systems.</PageIntro>
    <section className="nova-experience-accordion nova-experience-accordion--full" aria-label="Professional experience" data-nova-sequence="soft">
      {experiences.map((item) => <ExperienceCard key={`${item.id}:${selected?.id === item.id}`} item={item} initiallyOpen={selected?.id === item.id} detailed />)}
    </section>
  </div>;
}
