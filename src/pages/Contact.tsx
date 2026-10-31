import PageIntro from '../components/PageIntro';
import { usePortfolioContent } from '../context/usePortfolioContent';

export default function Contact() {
  const { content: { personalInfo } } = usePortfolioContent();

  return <div className="nova-page nova-contact-page page-shell">
    <PageIntro title="Contact">For opportunities and collaborations in mobile engineering, applied AI, and software systems.</PageIntro>
    <div className="nova-contact-list" data-nova-sequence="soft">
      <a className="nova-contact-list__email" href={`mailto:${personalInfo.email}`}>
        <span><span className="nova-kicker">Email</span><strong>{personalInfo.email}</strong></span>
        <span className="nova-contact-list__arrow" aria-hidden="true">↗</span>
      </a>
      <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
        <span><span className="nova-kicker">LinkedIn</span><strong>Connect on LinkedIn</strong></span>
        <span className="nova-contact-list__arrow" aria-hidden="true">↗</span>
      </a>
      <a href={personalInfo.github} target="_blank" rel="noreferrer">
        <span><span className="nova-kicker">GitHub</span><strong>Browse repositories</strong></span>
        <span className="nova-contact-list__arrow" aria-hidden="true">↗</span>
      </a>
    </div>
  </div>;
}
