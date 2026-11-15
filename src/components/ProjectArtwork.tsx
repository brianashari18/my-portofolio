import type { ProjectGalleryImage } from '../data/portfolioData';

export default function ProjectArtwork({ image, decorative = false, loading = 'lazy' }: {
  image: ProjectGalleryImage;
  decorative?: boolean;
  loading?: 'eager' | 'lazy';
}) {
  const alt = decorative ? '' : image.alt;
  const screenshot = <img src={image.src} alt={alt} loading={loading} decoding="async" />;

  if (image.frame === 'laptop') return <span className="nova-laptop-frame" aria-hidden={decorative || undefined}>
    <span className="nova-laptop-frame__display">
      <span className="nova-laptop-frame__chrome" aria-hidden="true">
        <span className="nova-laptop-frame__lights"><i /><i /><i /></span>
        <span className="nova-laptop-frame__address">Project preview</span>
      </span>
      <span className="nova-laptop-frame__screen">{screenshot}</span>
    </span>
    <span className="nova-laptop-frame__base" aria-hidden="true" />
  </span>;

  if (image.frame !== 'phone') return screenshot;

  return <span className="nova-device-frame" data-frame-style={image.frameStyle} aria-hidden={decorative || undefined}>
    <span className="nova-device-frame__screen">{screenshot}</span>
  </span>;
}
