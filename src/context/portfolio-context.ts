import { createContext } from 'react';
import type { PortfolioContent } from '../data/portfolioData';

export type RemoteState = 'loading' | 'ready' | 'missing' | 'unconfigured' | 'error';

export interface PortfolioContextValue {
  content: PortfolioContent;
  remoteState: RemoteState;
  errorMessage: string | null;
  saveContent: (content: PortfolioContent) => Promise<void>;
}

export const PortfolioContext = createContext<PortfolioContextValue | null>(null);
