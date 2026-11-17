import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { defaultPortfolioContent } from '../data/portfolioData';
import type { PortfolioContent } from '../data/portfolioData';
import { readPortfolioContent, writePortfolioContent } from '../lib/portfolioRepository';
import { mergeReviewedTechnologies } from '../lib/mergeReviewedTechnologies';
import { isSupabaseConfigured } from '../lib/supabase';
import { PortfolioContext } from './portfolio-context';
import type { RemoteState } from './portfolio-context';

export function PortfolioProvider({ children }: PropsWithChildren) {
  const [content, setContent] = useState(defaultPortfolioContent);
  const [remoteState, setRemoteState] = useState<RemoteState>(isSupabaseConfigured ? 'loading' : 'unconfigured');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;

    readPortfolioContent()
      .then((remoteContent) => {
        if (!active) return;
        if (remoteContent) {
          setContent(mergeReviewedTechnologies(remoteContent));
          setRemoteState('ready');
        } else {
          setRemoteState('missing');
        }
      })
      .catch((error: unknown) => {
        if (!active) return;
        setRemoteState('error');
        setErrorMessage(error instanceof Error ? error.message : 'Could not load saved portfolio content.');
      });

    return () => { active = false; };
  }, []);

  const saveContent = useCallback(async (nextContent: PortfolioContent) => {
    await writePortfolioContent(nextContent);
    setContent(nextContent);
    setRemoteState('ready');
    setErrorMessage(null);
  }, []);

  const value = useMemo(() => ({ content, remoteState, errorMessage, saveContent }), [content, remoteState, errorMessage, saveContent]);
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}
