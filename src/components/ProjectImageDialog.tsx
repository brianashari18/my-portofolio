import { useEffect, useRef, useState } from 'react';
import type { ProjectGalleryImage } from '../data/portfolioData';

export default function ProjectImageDialog({ images, index, onChange, onClose }: {
  images: (ProjectGalleryImage & { title: string })[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const screenshot = useRef<HTMLImageElement>(null);
  const [zoomWidth, setZoomWidth] = useState(0);
  const image = images[index];
  const multiple = images.length > 1;

  useEffect(() => {
    if (dialog.current && !dialog.current.open) dialog.current.showModal();
  }, []);

  function step(direction: number) {
    resetZoom();
    onChange((index + direction + images.length) % images.length);
  }

  function resetZoom() {
    setZoomWidth(0);
    viewport.current?.scrollTo(0, 0);
  }

  function toggleZoom() {
    if (zoomWidth) {
      resetZoom();
      return;
    }

    const picture = screenshot.current;
    const area = viewport.current;
    if (!picture?.naturalWidth || !area) return;
    const readableWidth = Math.min(area.clientWidth - 16, 560);
    setZoomWidth(Math.max(readableWidth, Math.round(picture.clientWidth * 1.65)));
  }

  return <dialog
    ref={dialog}
    className="nova-image-dialog"
    aria-labelledby="project-image-title"
    onClose={onClose}
    onKeyDown={(event) => {
      if (!multiple || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      if (zoomWidth && event.target === viewport.current) return;
      event.preventDefault();
      step(event.key === 'ArrowLeft' ? -1 : 1);
    }}
  >
    <div className="nova-image-dialog__bar">
      <div aria-live="polite" aria-atomic="true">
        <h2 id="project-image-title">{image.title}</h2>
        {multiple && <span>Image {index + 1} of {images.length}</span>}
      </div>
      <button type="button" onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button>
    </div>
    <figure>
      <div
        className="nova-image-dialog__viewport"
        data-zoomed={zoomWidth ? true : undefined}
        ref={viewport}
        role={zoomWidth ? 'region' : undefined}
        aria-label={zoomWidth ? 'Zoomed screenshot, scroll to see more' : undefined}
        tabIndex={zoomWidth ? 0 : undefined}
      >
        <img key={image.src} ref={screenshot} src={image.src} alt={image.alt} style={zoomWidth ? { width: zoomWidth } : undefined} />
      </div>
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
    <div className="nova-image-dialog__navigation">
      {multiple && <button type="button" onClick={() => step(-1)}>← Previous</button>}
      <button className="nova-image-dialog__zoom" type="button" onClick={toggleZoom}>{zoomWidth ? 'Fit to screen' : 'Zoom in'}</button>
      {multiple && <button type="button" onClick={() => step(1)}>Next →</button>}
    </div>
  </dialog>;
}
