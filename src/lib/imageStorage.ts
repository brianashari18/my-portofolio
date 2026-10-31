import { supabase } from './supabase';

export const PORTFOLIO_IMAGE_BUCKET = 'portfolio-images';
export const PORTFOLIO_IMAGE_MAX_BYTES = 10 * 1024 * 1024;
export const PORTFOLIO_IMAGE_ACCEPT = 'image/avif,image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif';

const heicMimeTypes = new Set([
  'image/heic',
  'image/heif',
  'image/heic-sequence',
  'image/heif-sequence',
]);

const imageExtensions: Record<string, string> = {
  'image/avif': 'avif',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export async function uploadPortfolioImage(file: File, folder: string): Promise<string> {
  if (!supabase) throw new Error('Supabase is not configured.');
  if (file.size > PORTFOLIO_IMAGE_MAX_BYTES) throw new Error('Image files must be 10 MB or smaller.');

  let uploadFile = file;
  const isHeic = heicMimeTypes.has(file.type.toLowerCase()) || /\.(heic|heif)$/i.test(file.name);

  if (isHeic) {
    try {
      const { default: convertHeic } = await import('heic2any');
      const converted = await convertHeic({ blob: file, toType: 'image/jpeg', quality: 0.9 });
      const jpeg = Array.isArray(converted) ? converted[0] : converted;
      if (!(jpeg instanceof Blob)) throw new Error('The converter returned no image.');
      uploadFile = new File([jpeg], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
        type: 'image/jpeg',
        lastModified: file.lastModified,
      });
    } catch {
      throw new Error('Could not convert this HEIC/HEIF image. Try exporting it as JPEG.');
    }

    if (uploadFile.size > PORTFOLIO_IMAGE_MAX_BYTES) throw new Error('The converted image is larger than 10 MB.');
  }

  const extension = imageExtensions[uploadFile.type];
  if (!extension) throw new Error('Choose a PNG, JPEG, WebP, AVIF, or HEIC/HEIF image.');

  const safeFolder = folder
    .split('/')
    .map((part) => part.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '') || 'portfolio')
    .join('/');
  const path = `${safeFolder}/${crypto.randomUUID()}.${extension}`;
  const storage = supabase.storage.from(PORTFOLIO_IMAGE_BUCKET);
  const { error } = await storage.upload(path, uploadFile, {
    cacheControl: '3600',
    contentType: uploadFile.type,
    upsert: false,
  });

  if (error) throw error;
  return storage.getPublicUrl(path).data.publicUrl;
}
