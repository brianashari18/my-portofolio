import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePortfolioContent } from '../context/usePortfolioContent';

const rootUrl = 'https://brianashari18.github.io/my-portofolio';

export function usePageMeta() {
  const { pathname } = useLocation();
  const { content: { projects, personalInfo } } = usePortfolioContent();
  useEffect(() => {
    const slug = pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1];
    const project = projects.find((item) => item.slug === slug);
    const title = project
      ? `${project.title} — Project | ${personalInfo.name}`
      : pathname === '/'
        ? `${personalInfo.title} | ${personalInfo.name}`
        : (pageTitles[pathname]?.replace('{name}', personalInfo.name) ?? `${personalInfo.title} | ${personalInfo.name}`);
    const description = project?.description ?? pageDescriptions[pathname] ?? personalInfo.summary;
    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', `${rootUrl}${pathname}`, 'property');
    setMeta('og:type', project ? 'article' : 'website', 'property');
    setMeta('og:image', `${rootUrl}/social-card.svg`, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setLink('canonical', `${rootUrl}${pathname}`);
    setMeta('robots', pathname === '/admin' ? 'noindex, nofollow' : 'index, follow');
  }, [pathname, projects, personalInfo]);
}

const pageTitles: Record<string, string> = {
  '/projects': 'Projects | {name}',
  '/experience': 'Experience | {name}',
  '/about': 'About | {name}',
  '/contact': 'Contact | {name}',
  '/admin': 'Portfolio admin | {name}',
};

const pageDescriptions: Record<string, string> = {
  '/projects': 'Selected iOS and Flutter projects by Brian Anashari, with dedicated project pages and technology details.',
  '/experience': 'Professional experience in iOS development, AI engineering, system administration, databases, and ERP customization.',
  '/about': 'About Brian Anashari, a software engineer specializing in mobile development and AI.',
  '/contact': 'Contact Brian Anashari by email, GitHub, or LinkedIn.',
};

function setMeta(name: string, content: string, attribute = 'name') {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.append(element);
  }
  element.content = content;
}

function setLink(rel: string, href: string) {
  let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.append(element);
  }
  element.href = href;
}
