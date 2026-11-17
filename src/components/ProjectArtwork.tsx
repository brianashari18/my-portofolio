import type { ProjectGalleryImage } from '../data/portfolioData';
import browserControl1 from '../assets/images/project-frames/browser-control-1.svg';
import browserControl2 from '../assets/images/project-frames/browser-control-2.svg';
import browserControl3 from '../assets/images/project-frames/browser-control-3.svg';
import iphone17Frame from '../assets/images/project-frames/figma/iphone-17-black.svg';
import androidCompactBlackFrame from '../assets/images/project-frames/figma/android-compact-black.svg';
import macbookProFrame from '../assets/images/project-frames/figma/macbook-pro-13.svg';

export default function ProjectArtwork({ image, decorative = false, loading = 'lazy' }: {
  image: ProjectGalleryImage;
  decorative?: boolean;
  loading?: 'eager' | 'lazy';
}) {
  const alt = decorative ? '' : image.alt;
  const screenshot = <img src={image.src} alt={alt} loading={loading} decoding="async" />;

  if (image.frame === 'browser') return <span className="nova-browser-frame" aria-hidden={decorative || undefined}>
    <span className="nova-browser-frame__chrome" aria-hidden="true">
      <span className="nova-browser-frame__controls">
        <img src={browserControl1} alt="" />
        <img src={browserControl2} alt="" />
        <img src={browserControl3} alt="" />
      </span>
      <span className="nova-browser-frame__address" />
    </span>
    <span className="nova-browser-frame__screen">{screenshot}</span>
  </span>;

  if (image.frame === 'laptop') return <span className="nova-laptop-frame" aria-hidden={decorative || undefined}>
    <img className="nova-laptop-frame__body" src={macbookProFrame} alt="" aria-hidden="true" />
    <span className="nova-laptop-frame__screen">{screenshot}</span>
  </span>;

  if (image.frame !== 'phone' || !image.frameStyle) return screenshot;

  const deviceFrame = image.frameStyle === 'ios' ? iphone17Frame : androidCompactBlackFrame;

  return <span className="nova-device-frame" data-frame-style={image.frameStyle ?? 'none'} aria-hidden={decorative || undefined}>
    <img className="nova-device-frame__body" src={deviceFrame} alt="" aria-hidden="true" />
    <span className={`nova-device-frame__screen nova-device-frame__screen--${image.frameStyle}`}>{screenshot}</span>
  </span>;
}
