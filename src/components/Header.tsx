import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, CloseIcon, SparklesIcon, GithubIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/my-portofolio/' || location.pathname === '/my-portofolio';
    return location.pathname.includes(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-xl shadow-cyan-950/20' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Badge */}
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                  BA
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-100 tracking-tight group-hover:text-cyan-400 transition-colors">
                Brian<span className="text-cyan-400">.dev</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase -mt-1">
                Mobile & Web
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/40 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Button & GitHub */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <Link
              to="/contact"
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <SparklesIcon className="w-4 h-4 text-cyan-200" />
              <span>Let's Talk</span>
            </Link>
          </div>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass-nav border-b border-slate-800/80 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      active
                        ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <Link
                  to="/contact"
                  className="w-full text-center py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
