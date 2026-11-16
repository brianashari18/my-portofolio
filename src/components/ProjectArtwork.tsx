import type { ProjectGalleryImage } from '../data/portfolioData';
import androidEarpiece from '../assets/images/project-frames/android-earpiece.svg';
import browserControl1 from '../assets/images/project-frames/browser-control-1.svg';
import browserControl2 from '../assets/images/project-frames/browser-control-2.svg';
import browserControl3 from '../assets/images/project-frames/browser-control-3.svg';

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

  return <span className="nova-device-frame" data-frame-style={image.frameStyle ?? 'none'} aria-hidden={decorative || undefined}>
    <span className="nova-device-frame__screen">{screenshot}</span>
    {image.frameStyle === 'ios' && <>
      <span className="nova-device-frame__ios-island" aria-hidden="true" />
      <span className="nova-device-frame__ios-home" aria-hidden="true" />
    </>}
    {image.frameStyle === 'android' && <span className="nova-device-frame__android-earpiece" style={{ backgroundImage: `url("${androidEarpiece}")` }} aria-hidden="true" />}
  </span>;
}
