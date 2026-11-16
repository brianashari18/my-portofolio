import type { Experience } from '../data/portfolioData';

// These entries are listed under "Organization Experience" in Brian's CV.
// Proclub remains in that group to match the CV's own sectioning.
const organizationExperienceIds = new Set([
  'bidikmisi-student-forum',
  'chevalier-lab',
  'central-computer-improvement',
  'new-student-orientation',
  'proclub-telkom-university',
]);

export function groupExperiences(experiences: Experience[]) {
  return experiences.reduce<{ professional: Experience[]; organization: Experience[] }>((groups, experience) => {
    const group = organizationExperienceIds.has(experience.id) ? groups.organization : groups.professional;
    group.push(experience);
    return groups;
  }, { professional: [], organization: [] });
}
