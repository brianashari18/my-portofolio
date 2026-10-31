import profileImage from '../assets/images/about/profile-optimized.jpg';
import foamyImage from '../assets/images/projects/foamy-gallery.webp';
import hichefImage from '../assets/images/projects/hichef-gallery.webp';
import chatImage from '../assets/images/projects/chat-app.webp';
import expenseImage from '../assets/images/projects/expense-tracker-app.webp';
import mealsImage from '../assets/images/projects/meals-app.webp';
import quizImage from '../assets/images/projects/quiz-app.webp';
import roleDiceImage from '../assets/images/projects/role-dice-app.webp';
import type { Project } from '../data/portfolioData';

const bundledImages: Record<string, string> = {
  'profile-optimized.jpg': profileImage,
  'foamy-gallery.webp': foamyImage,
  'hichef-gallery.webp': hichefImage,
  'chat-app.webp': chatImage,
  'expense-tracker-app.webp': expenseImage,
  'meals-app.webp': mealsImage,
  'quiz-app.webp': quizImage,
  'role-dice-app.webp': roleDiceImage,
};

export function resolvePortfolioImage(source?: string): string | undefined {
  if (!source) return undefined;
  const path = source.split(/[?#]/, 1)[0];
  const file = path.slice(path.lastIndexOf('/') + 1);
  // Suppress the original composites, including URLs saved by an older build.
  if (/^(?:(?:sprout|muncakin|step-?up)-gallery|e-waste-app)(?:-[\w-]+)?\.(?:png|webp|jpe?g)$/i.test(file)) return undefined;
  if (!/^\/(?:my-portofolio\/)?src\/assets\/images\//.test(source)) return source;
  if (file === 'profile.jpg') return profileImage;
  return bundledImages[file.replace(/\.png$/, '.webp')];
}

export function getProjectCover(project: Project) {
  return getProjectCoverImage(project)?.src;
}

export function getProjectCoverImage(project: Project) {
  const src = resolvePortfolioImage(project.thumbnail) ?? resolvePortfolioImage(project.heroImage)
    ?? project.gallery?.map(({ src: imageSource }) => resolvePortfolioImage(imageSource)).find(Boolean);
  if (!src) return undefined;
  const galleryImage = project.gallery?.find((image) => resolvePortfolioImage(image.src) === src);
  return galleryImage ? { ...galleryImage, src } : { src, alt: `${project.title} project preview`, frame: 'none' as const };
}
