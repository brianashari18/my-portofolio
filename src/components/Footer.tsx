import { Link, useLocation } from 'react-router-dom';
import { usePortfolioContent } from '../context/usePortfolioContent';
import ActionLink from './ActionLink';

export default function Footer() {
  const { pathname } = useLocation();
  const { content: { personalInfo } } = usePortfolioContent();
  const isAdmin = pathname === '/admin';
  const showContact = !isAdmin && pathname !== '/contact';

  return <footer className={`nova-footer${isAdmin ? ' nova-footer--admin' : ''}`}>
    {showContact && <div className="nova-footer__cta page-shell" data-nova-sequence="soft">
      <p className="nova-kicker">Get in touch</p>
      <h2>Let’s work together.</h2>
      <p className="nova-footer__lede">Interested in mobile products, applied AI, or the systems behind them? I’d be glad to hear from you.</p>
      <div className="nova-footer__actions">
        <ActionLink to="/contact" variant="copper" arrow={false}>Contact {personalInfo.name.split(' ')[0]}</ActionLink>
        <ActionLink href={`mailto:${personalInfo.email}`} variant="outline" arrow={false}>Send an email</ActionLink>
      </div>
    </div>}
    <div className="nova-footer__base page-shell">
      <div className="nova-footer__identity"><Link to="/">{personalInfo.name}</Link><span>{personalInfo.title}</span></div>
      <nav aria-label="Footer navigation"><Link to="/projects">Work</Link><Link to="/experience">Experience</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link></nav>
      <div className="nova-footer__social"><a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
    </div>
    <div className="nova-footer__bottom page-shell"><span>© {new Date().getFullYear()} {personalInfo.name}</span><button type="button" onClick={() => {
      document.querySelector<HTMLElement>('.nova-brand')?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'auto' });
    }}>Back to top ↑</button></div>
  </footer>;
}
