import profileImage from '../assets/images/about/profile-optimized.jpg';
import { portfolioProjectImageAssets } from '../data/portfolioData';
import type { Project, ProjectGalleryImage } from '../data/portfolioData';

const bundledImages: Record<string, string> = {
  'profile-optimized.jpg': profileImage,
};

export function resolvePortfolioImage(source?: string): string | undefined {
  if (!source) return undefined;
  const path = source.split(/[?#]/, 1)[0];
  const file = path.slice(path.lastIndexOf('/') + 1);
  const projectAsset = path.match(/^\/?(?:my-portofolio\/)?src\/assets\/images\/projects\/(.+)$/i);
  if (projectAsset) return portfolioProjectImageAssets[projectAsset[1]];
  if (!/^\/(?:my-portofolio\/)?src\/assets\/images\//.test(source)) return source;
  if (file === 'profile.jpg') return profileImage;
  return bundledImages[file.replace(/\.png$/, '.webp')];
}

export function getDefaultProjectImageFrame(platforms: string[]): Pick<ProjectGalleryImage, 'frame' | 'frameStyle'> {
  const normalized = platforms.map((platform) => platform.toLowerCase());
  const hasIos = normalized.some((platform) => /\bios\b/.test(platform));
  const hasAndroid = normalized.some((platform) => /\bandroid\b/.test(platform));
  const hasMobile = normalized.some((platform) => /\bmobile\b|\bflutter\b/.test(platform));
  const hasWeb = normalized.some((platform) => /\bweb\b|\bwebsite\b|\bbrowser\b|\bdesktop\b/.test(platform));
  const mobilePlatforms = Number(hasIos) + Number(hasAndroid) + Number(hasMobile);

  if (mobilePlatforms > 0 && hasWeb) return { frame: 'none' };
  if (hasIos && hasAndroid) return { frame: 'phone' };
  if (hasIos) return { frame: 'phone', frameStyle: 'ios' };
  if (hasAndroid) return { frame: 'phone', frameStyle: 'android' };
  if (hasMobile) return { frame: 'phone' };
  if (hasWeb) return { frame: 'browser' };
  return { frame: 'none' };
}

export function getProjectGalleryImage(project: Project, image: ProjectGalleryImage, src = image.src): ProjectGalleryImage {
  const defaultFrame = getDefaultProjectImageFrame(project.platforms);
  const canUpgradeLegacyPhone = image.frame === 'phone' && image.frameStyle === undefined &&
    (defaultFrame.frame === 'browser' || defaultFrame.frameStyle !== undefined);
  return image.frame === undefined || canUpgradeLegacyPhone
    ? { ...image, src, ...defaultFrame }
    : { ...image, src };
}

export function getProjectGalleryImages(project: Project): Array<ProjectGalleryImage & { title: string }> {
  const images = new Map<string, ProjectGalleryImage>();
  const defaultFrame = getDefaultProjectImageFrame(project.platforms);
  for (const source of [project.thumbnail, project.heroImage]) {
    const src = resolvePortfolioImage(source);
    if (!src || images.has(src)) continue;
    const galleryImage = project.gallery?.find((image) => resolvePortfolioImage(image.src) === src);
    images.set(src, galleryImage
      ? getProjectGalleryImage(project, galleryImage, src)
      : { src, alt: `${project.title} project preview`, ...defaultFrame });
  }
  for (const image of project.gallery ?? []) {
    const src = resolvePortfolioImage(image.src);
    if (src && !images.has(src)) images.set(src, getProjectGalleryImage(project, image, src));
  }
  return [...images.values()].map((image, index) => ({
    ...image,
    title: image.title?.trim() || `Screen ${String(index + 1).padStart(2, '0')}`,
  }));
}

export function getProjectCover(project: Project) {
  return getProjectCoverImage(project)?.src;
}

export function getProjectCoverImage(project: Project) {
  const src = resolvePortfolioImage(project.thumbnail) ?? resolvePortfolioImage(project.heroImage)
    ?? project.gallery?.map(({ src: imageSource }) => resolvePortfolioImage(imageSource)).find(Boolean);
  if (!src) return undefined;
  const galleryImage = project.gallery?.find((image) => resolvePortfolioImage(image.src) === src);
  return galleryImage
    ? getProjectGalleryImage(project, galleryImage, src)
    : { src, alt: `${project.title} project preview`, ...getDefaultProjectImageFrame(project.platforms) };
}
