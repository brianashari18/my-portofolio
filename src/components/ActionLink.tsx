import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type ActionLinkProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: 'dark' | 'light' | 'outline' | 'copper';
  className?: string;
  arrow?: string | false;
  external?: boolean;
};

export default function ActionLink({ children, to, href, variant = 'dark', className = '', arrow = '↗', external = false }: ActionLinkProps) {
  const content = <>
    <span className="nova-button__label"><span>{children}</span><span aria-hidden="true">{children}</span></span>
    {arrow && <span className="nova-button__arrow" aria-hidden="true">{arrow}</span>}
  </>;
  const classes = `nova-button nova-button--${variant} ${className}`.trim();
  if (to) return <Link to={to} className={classes}>{content}</Link>;
  return <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>{content}</a>;
}
