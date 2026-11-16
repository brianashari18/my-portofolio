import type { Project } from '../data/portfolioData';

const monthNumber: Record<string, number> = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

function getTimelineEnd(timeline?: string): number {
  if (!timeline) return Number.NEGATIVE_INFINITY;

  const dates = [...timeline.matchAll(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})\b/g)];
  const endDate = dates[dates.length - 1];
  if (!endDate) return Number.NEGATIVE_INFINITY;

  return Number(endDate[2]) * 12 + monthNumber[endDate[1]];
}

export function sortProjectsByTimelineNewestFirst(projects: Project[]): Project[] {
  return [...projects].sort((left, right) => getTimelineEnd(right.timeline) - getTimelineEnd(left.timeline));
}
