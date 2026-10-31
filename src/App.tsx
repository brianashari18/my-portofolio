import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Experience from './pages/Experience';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { usePageMeta } from './hooks/usePageMeta';
import Admin from './pages/Admin';
import { PortfolioProvider } from './context/PortfolioContext';
import { usePortfolioContent } from './context/usePortfolioContent';
import { ThemeProvider } from './context/ThemeContext';

function RouteEffects() {
  const { pathname, hash } = useLocation();
  const { content } = usePortfolioContent();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const changedPage = previousPath.current !== pathname;
    previousPath.current = pathname;
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (changedPage) document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [pathname, hash]);
  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    target?.scrollIntoView({ behavior: 'instant' });
    target?.focus({ preventScroll: true });
  }, [content, hash, pathname]);
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = document.querySelectorAll<HTMLElement>('[data-nova-reveal], [data-nova-sequence] > *');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-nova-motion', 'visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.05 });

    targets.forEach((target) => {
      if (target.dataset.novaMotion === 'visible') return;
      target.dataset.novaMotion = 'pending';
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
      targets.forEach((target) => {
        if (target.dataset.novaMotion === 'pending') delete target.dataset.novaMotion;
      });
    };
  }, [content, pathname]);
  return null;
}

function AppRoutes() {
  usePageMeta();
  return <>
    <RouteEffects />
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header />
    <main id="main-content" className="site-main" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </>;
}

export default function App() {
  return <BrowserRouter basename={import.meta.env.BASE_URL}>
    <ThemeProvider><PortfolioProvider><AppRoutes /></PortfolioProvider></ThemeProvider>
  </BrowserRouter>;
}
