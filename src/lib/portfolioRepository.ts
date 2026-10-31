import type { PortfolioContent, ProjectGalleryImage } from '../data/portfolioData';
import { supabase } from './supabase';

const CONTENT_ROW_ID = 'main';

export async function readPortfolioContent(): Promise<PortfolioContent | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('portfolio_content')
    .select('content')
    .eq('id', CONTENT_ROW_ID)
    .maybeSingle();

  if (error) throw error;
  if (!data || !isPortfolioContent(data.content)) return null;
  return data.content;
}

export async function writePortfolioContent(content: PortfolioContent): Promise<void> {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { error } = await supabase
    .from('portfolio_content')
    .upsert({ id: CONTENT_ROW_ID, content, updated_at: new Date().toISOString() });

  if (error) throw error;
}

export async function checkPortfolioAdmin(userId: string): Promise<boolean> {
  if (!supabase) return false;

  const { data, error } = await supabase
    .from('portfolio_admins')
    .select('user_id')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return Boolean(data);
}

function isPortfolioContent(value: unknown): value is PortfolioContent {
  if (!value || typeof value !== 'object') return false;
  const content = value as Partial<PortfolioContent>;
  const info = content.personalInfo;
  if (!info || typeof info !== 'object') return false;
  if (![info.name, info.title, info.summary, info.location, info.email, info.github, info.linkedin, info.profileImage].every(isString)) return false;
  if (!Array.isArray(content.projects) || !content.projects.every(isProject)) return false;
  if (!Array.isArray(content.experiences) || !content.experiences.every(isExperience)) return false;
  if (!Array.isArray(content.skillCategories) || !content.skillCategories.every(isSkillCategory)) return false;
  return true;
}

function isProject(value: unknown): value is PortfolioContent['projects'][number] {
  if (!isRecord(value)) return false;
  if (![value.id, value.slug, value.title, value.tagline, value.description].every(isString)) return false;
  if (typeof value.featured !== 'boolean') return false;
  if (![value.categories, value.platforms, value.technologies].every(isStringArray)) return false;
  if (['role', 'timeline', 'status', 'thumbnail', 'heroImage', 'problem', 'solution'].some((key) => key in value && !isString(value[key]))) return false;
  if (['features', 'engineeringChallenges', 'contributions', 'results', 'reflections'].some((key) => key in value && !isStringArray(value[key]))) return false;
  if ('galleryTone' in value && !['paper', 'blush', 'surface', 'sage', 'ink'].includes(String(value.galleryTone))) return false;
  if ('gallery' in value && (!Array.isArray(value.gallery) || !value.gallery.every(isGalleryImage))) return false;
  if ('architecture' in value && (!isRecord(value.architecture) || !isString(value.architecture.summary) || ('diagram' in value.architecture && !isString(value.architecture.diagram)) || ('caption' in value.architecture && !isString(value.architecture.caption)))) return false;
  if ('links' in value && (!Array.isArray(value.links) || !value.links.every((link) => isRecord(link) && isString(link.label) && isString(link.href) && ['github', 'demo', 'video', 'other'].includes(String(link.kind))))) return false;
  return true;
}

function isGalleryImage(value: unknown): value is ProjectGalleryImage {
  return isRecord(value) && isString(value.src) && isString(value.alt) &&
    (!('title' in value) || isString(value.title)) &&
    (!('caption' in value) || isString(value.caption)) &&
    (!('frame' in value) || value.frame === 'phone' || value.frame === 'none') &&
    (!('frameStyle' in value) || value.frameStyle === 'ios' || value.frameStyle === 'android');
}

function isExperience(value: unknown): value is PortfolioContent['experiences'][number] {
  return isRecord(value) &&
    [value.id, value.organization, value.position, value.summary].every(isString) &&
    isStringArray(value.contributions) && isStringArray(value.technologies);
}

function isSkillCategory(value: unknown): value is PortfolioContent['skillCategories'][number] {
  return isRecord(value) && isString(value.name) && Array.isArray(value.skills) && value.skills.every((skill) =>
    isRecord(skill) && isString(skill.name) &&
    ['Demonstrated', 'Practical familiarity', 'Exploring'].includes(String(skill.evidence)) &&
    isStringArray(skill.evidenceIds) && (!('evidenceNote' in skill) || isString(skill.evidenceNote)),
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}
