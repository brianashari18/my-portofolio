import { useContext } from 'react';
import { PortfolioContext } from './portfolio-context';

export function usePortfolioContent() {
  const value = useContext(PortfolioContext);
  if (!value) throw new Error('usePortfolioContent must be used inside PortfolioProvider.');
  return value;
}
