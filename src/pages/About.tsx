import { Link } from 'react-router-dom';
import ActionLink from '../components/ActionLink';
import SectionHeading from '../components/SectionHeading';
import { usePortfolioContent } from '../context/usePortfolioContent';
import { awardRecords, educationRecords } from '../data/portfolioData';
import { resolvePortfolioImage } from '../lib/resolvePortfolioImage';

export default function About() {
  const { content: { experiences, personalInfo, projects, skillCategories } } = usePortfolioContent();
  const portrait = resolvePortfolioImage(personalInfo.profileImage);
  const evidence = new Map<string, { title: string; to: string }>([
    ...projects.map((project) => [project.id, { title: project.title, to: `/projects/${project.slug}` }] as const),
    ...experiences.map((item) => [item.id, { title: item.organization, to: `/experience#experience-${item.id}` }] as const),
  ]);

  return <div className="nova-page nova-about-page page-shell">
    <header className={`nova-about-feature${portrait ? '' : ' nova-about-feature--text'}`}>
      {portrait && <div className="nova-about-feature__image"><img src={portrait} alt={`Portrait of ${personalInfo.name}`} loading="lazy" /></div>}
      <div className="nova-about-feature__copy" data-nova-enter-sequence>
        <p className="nova-kicker">{personalInfo.location}</p>
        <h1>{personalInfo.name}<span className="nova-period" aria-hidden="true">.</span></h1>
        <p className="nova-about-feature__title">{personalInfo.title}</p>
        <p>{personalInfo.summary}</p>
        <div className="nova-about-feature__actions">
          {skillCategories.length > 0 && <ActionLink to="/about#skills" arrow="↓">See technical skills</ActionLink>}
          <ActionLink to="/experience" variant="outline" arrow={false}>View experience</ActionLink>
        </div>
      </div>
    </header>
    <div className="nova-about-records">
      <section aria-label="Education">
        <SectionHeading title="Education" />
        <ul className="nova-about-record-list nova-about-education-list">
          {educationRecords.map((record) => <li key={record.institution}>
            <div className="nova-about-record-heading">
              <div>
                <h3>{record.institution}</h3>
                <p className="nova-about-record-subtitle">{record.qualification}</p>
              </div>
              <div className="nova-about-record-meta">
                <span>{record.location}</span>
                <time>{record.timeline}</time>
              </div>
            </div>
            <ul className="nova-about-record-details">
              {record.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </li>)}
        </ul>
      </section>
      <section aria-label="Awards and recognition">
        <SectionHeading title="Awards & Recognition" />
        <ul className="nova-about-record-list nova-about-award-list">
          {awardRecords.map((award) => <li key={`${award.title}-${award.project}`}>
            <div className="nova-about-record-heading">
              <div>
                <h3>{award.title}</h3>
                <p className="nova-about-record-subtitle">{award.distinction}</p>
                <p className="nova-about-record-project">{award.href
                  ? <Link to={award.href}>{award.project}</Link>
                  : award.project}</p>
              </div>
              <time className="nova-about-record-meta">{award.date}</time>
            </div>
          </li>)}
        </ul>
      </section>
    </div>
    {skillCategories.length > 0 && <section id="skills" className="nova-about-skills" tabIndex={-1} aria-label="Skills and evidence">
      <SectionHeading title="Skills and evidence"><p>Open a project or experience to see where each skill was used.</p></SectionHeading>
      <div className="nova-skill-grid">
        {skillCategories.map((category, index) => <section id={`skills-${index + 1}`} className="nova-skill-category" key={category.name} tabIndex={-1}>
          <div className="nova-skill-category__header"><h3>{category.name}</h3></div>
          <ul>{category.skills.map((skill) => {
            const sources = skill.evidenceIds.flatMap((id) => evidence.get(id) ?? []);
            return <li key={skill.name}>
              <div><strong>{skill.name}</strong><span className={`nova-evidence nova-evidence--${skill.evidence.toLowerCase().replace(/ /g, '-')}`}>{skill.evidence}</span></div>
              {sources.length > 0 ? <small className="nova-skill-sources">
                {sources.map(({ title, to }) => <Link key={to} to={to}>{title}</Link>)}
              </small> : skill.evidenceNote && <small>{skill.evidenceNote}</small>}
            </li>;
          })}</ul>
        </section>)}
      </div>
    </section>}
  </div>;
}
