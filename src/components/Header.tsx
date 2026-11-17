import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { usePortfolioContent } from '../context/usePortfolioContent';
import ActionLink from './ActionLink';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'Work', to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const { key, pathname } = useLocation();
  const { content: { personalInfo } } = usePortfolioContent();

  useEffect(() => { setMenuOpen(false); }, [key]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (!event.matches) return;
      setMenuOpen(false);
      if (document.activeElement === menuToggle.current || document.activeElement?.closest('#mobile-navigation')) {
        document.querySelector<HTMLElement>('.nova-brand')?.focus();
      }
    }
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuToggle.current?.focus();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return <header id="top" className={`nova-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}>
    <div className="nova-header__shell">
      <Link className="nova-brand" to="/" aria-label={`${personalInfo.name}, home`} onClick={() => {
        setMenuOpen(false);
        if (pathname === '/') window.scrollTo({ top: 0, behavior: 'auto' });
      }}>{personalInfo.name}</Link>
      <nav id="primary-navigation" className="nova-nav" aria-label="Main navigation">
        {links.slice(0, 3).map(({ label, to }) => <NavLink key={to} to={to} className={({ isActive }) => `nova-nav__link${isActive ? ' is-active' : ''}`}>{label}</NavLink>)}
      </nav>
      <div className="nova-header__actions">
        <ActionLink to="/contact" className="nova-header__contact" arrow={false}>Contact</ActionLink>
        <ThemeToggle />
        <button ref={menuToggle} className="nova-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen((open) => !open)}>
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className={`nova-menu-toggle__icon${menuOpen ? ' is-open' : ''}`} aria-hidden="true">
            <span /><span /><span />
          </span>
        </button>
      </div>
    </div>
    <nav id="mobile-navigation" className="nova-mobile-nav" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
      {links.map(({ label, to }) => <NavLink key={to} to={to} tabIndex={menuOpen ? undefined : -1} onClick={() => {
        setMenuOpen(false);
        if (pathname === to) menuToggle.current?.focus();
      }} className={({ isActive }) => `nova-mobile-nav__link${isActive ? ' is-active' : ''}`}>{label}<span aria-hidden="true">↗</span></NavLink>)}
    </nav>
  </header>;
}
