import type { ProjectGalleryImage } from '../data/portfolioData';

export default function ProjectArtwork({ image, decorative = false, loading = 'lazy' }: {
  image: ProjectGalleryImage;
  decorative?: boolean;
  loading?: 'eager' | 'lazy';
}) {
  const alt = decorative ? '' : image.alt;
  const screenshot = <img src={image.src} alt={alt} loading={loading} decoding="async" />;

  if (image.frame !== 'phone') return screenshot;

  return <span className="nova-device-frame" data-frame-style={image.frameStyle} aria-hidden={decorative || undefined}>
    <span className="nova-device-frame__screen">{screenshot}</span>
  </span>;
}
