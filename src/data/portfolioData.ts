import foamyImage from '../assets/images/projects/foamy-gallery.webp';
import hichefImage from '../assets/images/projects/hichef-gallery.webp';
import roleDiceImage from '../assets/images/projects/role-dice-app.webp';
import quizImage from '../assets/images/projects/quiz-app.webp';
import expenseImage from '../assets/images/projects/expense-tracker-app.webp';
import mealsImage from '../assets/images/projects/meals-app.webp';
import chatImage from '../assets/images/projects/chat-app.webp';
import profileImage from '../assets/images/about/profile-optimized.jpg';

export type ProjectCategory = 'iOS Development' | 'Flutter Development' | 'AI / ML Engineering' | 'Backend Engineering' | 'Software Engineering';
export type GalleryTone = 'paper' | 'blush' | 'surface' | 'sage' | 'ink';

export interface ProjectGalleryImage {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  /** Presentation when the screenshot is used as the project cover. */
  frame?: 'phone' | 'none';
  /** Older readers can still render a generic phone frame. */
  frameStyle?: 'ios' | 'android';
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  platforms: string[];
  technologies: string[];
  role?: string;
  timeline?: string;
  status?: string;
  featured: boolean;
  thumbnail?: string;
  heroImage?: string;
  galleryTone?: GalleryTone;
  gallery?: ProjectGalleryImage[];
  problem?: string;
  solution?: string;
  features?: string[];
  architecture?: { summary: string; diagram?: string; caption?: string };
  engineeringChallenges?: string[];
  contributions?: string[];
  results?: string[];
  reflections?: string[];
  links?: { label: string; href: string; kind: 'github' | 'demo' | 'video' | 'other' }[];
}

export interface Experience {
  id: string;
  organization: string;
  position: string;
  summary: string;
  contributions: string[];
  technologies: string[];
}

export type EvidenceLevel = 'Demonstrated' | 'Practical familiarity' | 'Exploring';

export interface Skill {
  name: string;
  evidence: EvidenceLevel;
  evidenceIds: string[];
  evidenceNote?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  profileImage: string;
}

export interface PortfolioContent {
  personalInfo: PersonalInfo;
  projects: Project[];
  experiences: Experience[];
  skillCategories: SkillCategory[];
}

export const personalInfo: PersonalInfo = {
  name: 'Brian Anashari',
  title: 'Software Engineer specializing in Mobile & AI',
  summary: 'Building mobile applications and intelligent software systems, with experience across native iOS, backend services, and AI-powered workflows.',
  location: 'Indonesia',
  email: 'brianashari18@gmail.com',
  github: 'https://github.com/brianashari18',
  linkedin: 'https://www.linkedin.com/in/brian-anashari-099744151/',
  profileImage,
};

export const projects: Project[] = [
  {
    id: 'sprout', slug: 'sprout', title: 'Sprout', tagline: 'Guided reflection, grounded in emotional awareness',
    description: 'A journaling app that pairs guided entries and user-selected emotions with local analysis and weekly reflection.',
    categories: ['iOS Development', 'AI / ML Engineering', 'Backend Engineering'], platforms: ['iOS'],
    technologies: ['SwiftUI', 'SwiftData', 'Core ML', 'Foundation Models', 'Speech', 'AVFoundation', 'Go', 'FastAPI', 'Qdrant', 'Ollama', 'bge-m3', 'Docker'],
    role: 'iOS Developer', timeline: '2026', featured: true,
    problem: 'Starting a journal entry can feel difficult, and individual entries can be hard to revisit as a longer pattern.',
    solution: 'The iOS app combines guided prompts and user-selected emotion labels with local valence suggestions. Weekly summaries use a separate Go gateway and FastAPI worker with Qdrant retrieval; a distinct Apple Foundation Models path can generate reflective feedback when available.',
    features: ['Guided journal prompts', 'User-selected emotion and intensity', 'Core ML valence suggestion with lexical fallback', 'Weekly summary and retrieval workflow', 'Availability-gated Apple Foundation Models feedback'],
    architecture: { summary: 'The SwiftUI client stores journal data locally and calls a Go API gateway for weekly summaries. A separate FastAPI worker handles retrieval and narrative generation; a separate on-device Foundation Models service provides optional reflective feedback.' },
  },
  {
    id: 'foamy', slug: 'foamy', title: 'Foamy (MySkin)', tagline: 'Skincare analysis and routine companion',
    description: 'A skincare companion for product label scanning, ingredient lookup, product comparisons, and routine journaling.',
    categories: ['iOS Development'], platforms: ['iOS'], technologies: ['SwiftUI', 'SwiftData', 'Vision', 'URLSession', 'Combine'],
    role: 'iOS Developer', timeline: '2026', featured: true, thumbnail: foamyImage, heroImage: foamyImage,
    gallery: [{ src: foamyImage, alt: 'Foamy app screens showing product discovery, routine tracking, and progress photos', caption: 'Product discovery, routine tracking, and progress photos.' }],
    problem: 'Product details and routine observations can be difficult to compare and keep together over time.',
    solution: 'Foamy uses Vision text recognition to turn product-label photos into searchable text, then brings product and ingredient lookup together with a locally stored skin journal and comparison history.',
    features: ['Camera capture and product-label OCR', 'Product search and ingredient details', 'Product comparison history', 'Routine and journey notes with progress photos'],
    architecture: { summary: 'SwiftUI feature flows connect camera capture and Vision OCR to product and ingredient APIs. SwiftData models persist profiles, tracked products, comparisons, skincare journeys, milestones, entries, and progress photos.' },
  },
  {
    id: 'hichef', slug: 'hichef', title: 'HiChef', tagline: 'From recipe pages to guided cooking steps',
    description: 'A cooking assistant that imports recipe pages, organizes instructions, and supports voice-guided cooking.',
    categories: ['iOS Development', 'AI / ML Engineering'], platforms: ['iOS'],
    technologies: ['SwiftUI', 'SwiftData', 'Foundation Models', 'NaturalLanguage', 'Speech', 'AVFoundation'],
    role: 'iOS Developer', timeline: '2026', featured: true, thumbnail: hichefImage, heroImage: hichefImage,
    gallery: [{ src: hichefImage, alt: 'HiChef app screens showing recipe import, cooking steps, voice mode, and timer', caption: 'Recipe import, step breakdown, hands-free voice mode, and cooking timer.' }],
    problem: 'Online recipes can be difficult to follow while cooking, especially when instructions are lengthy and hands are occupied.',
    solution: 'HiChef extracts recipe information from webpages, stores recipes locally, and refines instructions into smaller steps. Speech recognition and spoken playback support hands-free navigation while cooking.',
    features: ['Recipe URL import and webpage extraction', 'Structured ingredient and instruction data', 'Instruction breakdown into smaller steps', 'Indonesian speech recognition and text-to-speech controls'],
    architecture: { summary: 'A recipe-import pipeline extracts relevant webpage sections and uses Apple Foundation Models to structure recipe content. SwiftData stores recipes; NaturalLanguage helps refine instructions for the speech-guided cooking flow.' },
  },
  {
    id: 'muncakin', slug: 'muncakin', title: 'Muncakin', tagline: 'Mountain-aware packing for a better-prepared hike',
    description: 'A hiking trip planner that generates an editable gear checklist from mountain type, trip duration, and group size.',
    categories: ['iOS Development'], platforms: ['iOS'],
    technologies: ['SwiftUI', 'Observation', 'Foundation'],
    role: 'iOS Developer', timeline: '2026', featured: true,
    problem: 'Generic packing lists do not account for different mountain trips, leaving preparation scattered and easy to overlook.',
    solution: 'Muncakin loads a gear catalog and selects standard or mountain-conditional items for a trip. The generated list can be edited and grouped by function or gear zone.',
    features: ['Trip setup with dates and group size', 'Gear checklist adapted to mountain type and trip duration', 'Functional or zone-based checklist grouping', 'Packed-state, add, edit, and remove actions'],
    architecture: { summary: 'A bundled JSON gear catalog is filtered by mountain type and item necessity, then mapped to trip-specific gear quantities. The packing view model supports checklist editing and alternative grouping modes.' },
  },
  {
    id: 'step-up', slug: 'step-up', title: 'Step Up', tagline: 'Small movement breaks, built into the day',
    description: 'An iOS stretch-break app with guided movement plans, timed sessions, and progress tracking.',
    categories: ['iOS Development'], platforms: ['iOS'],
    technologies: ['SwiftUI', 'ActivityKit', 'WidgetKit', 'UserNotifications', 'AVFoundation', 'Firebase Authentication', 'Cloud Firestore'],
    role: 'iOS Developer', timeline: '2026', featured: true,
    problem: 'Desk workers and students may spend long stretches seated and find it difficult to build a consistent movement habit.',
    solution: 'Step Up pairs short guided stretch plans with timed sessions and progress views. The active timer can be surfaced through a Live Activity and a home-screen widget.',
    features: ['Guided stretch plans and movement steps', 'Timed activity sessions', 'Streak and exercise statistics', 'Leaderboard and profile flows', 'Live Activity and WidgetKit support'],
    architecture: { summary: 'The SwiftUI app coordinates exercise and timer flows with ActivityKit and a WidgetKit extension. Firebase Authentication and Firestore-backed repositories support account and progress-related screens.' },
  },
  {
    id: 'e-wise', slug: 'e-wise', title: 'E-Wise', tagline: 'E-waste management and responsible disposal',
    description: 'A Flutter app focused on responsible e-waste disposal and recycling, with Firebase listed in its project record.',
    categories: ['Flutter Development', 'Software Engineering'], platforms: ['Android', 'iOS'],
    technologies: ['Flutter', 'Dart', 'Firebase'], featured: false,
  },
  {
    id: 'chat-app', slug: 'chat-app', title: 'Chat App', tagline: 'A Flutter chat application',
    description: 'A chat app built with Flutter and Firebase for communication and collaboration.',
    categories: ['Flutter Development', 'Software Engineering'], platforms: ['Android', 'iOS'],
    technologies: ['Flutter', 'Dart', 'Firebase'], featured: false, thumbnail: chatImage, heroImage: chatImage,
    gallery: [{ src: chatImage, alt: 'Flutter chat app project screens', caption: 'Project screens from the Flutter chat app.' }],
  },
  {
    id: 'expense-tracker', slug: 'expense-tracker', title: 'Expense Tracker', tagline: 'A simple way to track daily expenses',
    description: 'A Flutter app for recording and reviewing daily expenses.',
    categories: ['Flutter Development', 'Software Engineering'], platforms: ['Android', 'iOS'],
    technologies: ['Flutter', 'Dart'], featured: false, thumbnail: expenseImage, heroImage: expenseImage,
    gallery: [{ src: expenseImage, alt: 'Flutter expense tracker app project screens', caption: 'Project screens from the expense tracker app.' }],
  },
  {
    id: 'meals-app', slug: 'meals-app', title: 'Meals App', tagline: 'Recipes and meal planning',
    description: 'A Flutter app for discovering recipes and creating meal plans.',
    categories: ['Flutter Development', 'Software Engineering'], platforms: ['Android', 'iOS'],
    technologies: ['Flutter', 'Dart'], featured: false, thumbnail: mealsImage, heroImage: mealsImage,
    gallery: [{ src: mealsImage, alt: 'Flutter meals app project screens', caption: 'Project screens from the meals app.' }],
  },
  {
    id: 'quiz-app', slug: 'quiz-app', title: 'Quiz App', tagline: 'A quiz application built with Flutter',
    description: 'A simple quiz application developed using Flutter.',
    categories: ['Flutter Development', 'Software Engineering'], platforms: ['Android', 'iOS'],
    technologies: ['Flutter', 'Dart'], featured: false, thumbnail: quizImage, heroImage: quizImage,
    gallery: [{ src: quizImage, alt: 'Flutter quiz app project screens', caption: 'Project screens from the quiz app.' }],
  },
  {
    id: 'role-dice-app', slug: 'role-dice-app', title: 'Role Dice App', tagline: 'A dice roller for role-playing games',
    description: 'A simple Flutter app that simulates dice rolls for role-playing games.',
    categories: ['Flutter Development', 'Software Engineering'], platforms: ['Android', 'iOS'],
    technologies: ['Flutter', 'Dart'], featured: false, thumbnail: roleDiceImage, heroImage: roleDiceImage,
    gallery: [{ src: roleDiceImage, alt: 'Flutter role-playing dice app project screens', caption: 'Project screens from the role dice app.' }],
  },
];

export const experiences: Experience[] = [
  {
    id: 'apple-developer-academy', organization: 'Apple Developer Academy', position: 'iOS Development',
    summary: 'Collaborative end-to-end application development focused on native iOS.',
    contributions: ['Built iOS applications with Swift, SwiftUI, and UIKit', 'Worked through end-to-end application development in a collaborative setting'],
    technologies: ['Swift', 'SwiftUI', 'UIKit'],
  },
  {
    id: 'telkom-indonesia', organization: 'Telkom Indonesia', position: 'AI Engineering Intern',
    summary: 'Worked on AI engineering workflows involving document translation and presentation generation.',
    contributions: ['Worked with OCR and LLM-powered document translation', 'Contributed to RAG-based presentation generation', 'Worked across AI workflows and data processing'],
    technologies: ['OCR', 'LLMs', 'RAG', 'Data processing'],
  },
  {
    id: 'lensa', organization: 'Lensa', position: 'System Administration, Database Programming & ERP Customization',
    summary: 'Experience spanning system administration, database programming, and ERP customization.',
    contributions: ['System administration', 'Database programming', 'ERP customization'],
    technologies: ['Databases', 'ERP'],
  },
];

export const skillCategories: SkillCategory[] = [
  { name: 'Mobile development', skills: [
    { name: 'Swift', evidence: 'Demonstrated', evidenceIds: ['apple-developer-academy'] },
    { name: 'SwiftUI', evidence: 'Demonstrated', evidenceIds: ['apple-developer-academy', 'sprout', 'foamy', 'hichef', 'muncakin'] },
    { name: 'UIKit', evidence: 'Demonstrated', evidenceIds: ['apple-developer-academy'] },
    { name: 'Flutter', evidence: 'Demonstrated', evidenceIds: ['e-wise', 'chat-app', 'expense-tracker', 'meals-app', 'quiz-app', 'role-dice-app'] },
    { name: 'Android development', evidence: 'Exploring', evidenceIds: [], evidenceNote: 'Area of interest' },
  ] },
  { name: 'AI & data', skills: [
    { name: 'OCR', evidence: 'Demonstrated', evidenceIds: ['telkom-indonesia'] },
    { name: 'LLM workflows', evidence: 'Demonstrated', evidenceIds: ['telkom-indonesia'] },
    { name: 'Retrieval-augmented generation', evidence: 'Demonstrated', evidenceIds: ['telkom-indonesia'] },
    { name: 'Core ML', evidence: 'Demonstrated', evidenceIds: ['sprout'] },
  ] },
  { name: 'Backend & software systems', skills: [
    { name: 'Go', evidence: 'Demonstrated', evidenceIds: ['sprout'] },
    { name: 'FastAPI', evidence: 'Demonstrated', evidenceIds: ['sprout'] },
    { name: 'Firebase', evidence: 'Demonstrated', evidenceIds: ['e-wise', 'chat-app', 'step-up'] },
    { name: 'Database programming', evidence: 'Demonstrated', evidenceIds: ['lensa'] },
    { name: 'ERP customization', evidence: 'Demonstrated', evidenceIds: ['lensa'] },
    { name: 'React & TypeScript', evidence: 'Demonstrated', evidenceIds: [], evidenceNote: 'This portfolio website' },
  ] },
];

export const defaultPortfolioContent: PortfolioContent = {
  personalInfo,
  projects,
  experiences,
  skillCategories,
};
