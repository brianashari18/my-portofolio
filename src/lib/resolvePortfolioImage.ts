import profileImage from '../assets/images/about/profile-optimized.jpg';
import type { Project, ProjectGalleryImage } from '../data/portfolioData';

const bundledImages: Record<string, string> = {
  'profile-optimized.jpg': profileImage,
};

export function resolvePortfolioImage(source?: string): string | undefined {
  if (!source) return undefined;
  const path = source.split(/[?#]/, 1)[0];
  const file = path.slice(path.lastIndexOf('/') + 1);
  // Local project artwork was placeholder content; ignore legacy CMS paths to it.
  if (/^\/?(?:my-portofolio\/)?src\/assets\/images\/projects\//i.test(source)) return undefined;
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
  if (hasWeb) return { frame: 'laptop' };
  return { frame: 'none' };
}

export function getProjectGalleryImage(project: Project, image: ProjectGalleryImage, src = image.src): ProjectGalleryImage {
  const defaultFrame = getDefaultProjectImageFrame(project.platforms);
  const canUpgradeLegacyPhone = image.frame === 'phone' && image.frameStyle === undefined &&
    (defaultFrame.frame === 'laptop' || defaultFrame.frameStyle !== undefined);
  return image.frame === undefined || canUpgradeLegacyPhone
    ? { ...image, src, ...defaultFrame }
    : { ...image, src };
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
