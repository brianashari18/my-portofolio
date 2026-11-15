import profileImage from '../assets/images/about/profile-optimized.jpg';
import roleDiceIntroImage from '../assets/images/projects/role-dice/roll-dice-intro.webp';
import quizIntroImage from '../assets/images/projects/quiz-app/quiz-intro.png';
import quizQuestionImage from '../assets/images/projects/quiz-app/quiz-question.png';
import chatAppLoginImage from '../assets/images/projects/chat-app/login.png';
import expenseTrackerOverviewImage from '../assets/images/projects/expense-tracker/overview.webp';
import mealsCategoriesImage from '../assets/images/projects/meals-app/categories.webp';
import mealsRecipeListImage from '../assets/images/projects/meals-app/recipe-list.webp';
import mealsRecipeDetailImage from '../assets/images/projects/meals-app/recipe-detail.webp';
import eWiseHomeImage from '../assets/images/projects/e-wise/home-dashboard.jpg';
import eWisePointsImage from '../assets/images/projects/e-wise/wise-points.webp';
import eWiseSplashImage from '../assets/images/projects/e-wise/splash.png';
import eWiseMapImage from '../assets/images/projects/e-wise/map-order-status.webp';
import fitSpaceDiscoveryImage from '../assets/images/projects/fitspace/venue-discovery.png';
import fitSpaceScheduleImage from '../assets/images/projects/fitspace/booking-schedule.png';
import fitSpaceSplashImage from '../assets/images/projects/fitspace/splash.png';
import flickNFitWardrobeImage from '../assets/images/projects/flicknfit/wardrobe-outfit.webp';
import flickNFitProductDetailsImage from '../assets/images/projects/flicknfit/product-details.webp';
import mabrurLoginImage from '../assets/images/projects/mabrur/login.webp';
import mabrurPrayerHomeImage from '../assets/images/projects/mabrur/prayer-home.webp';
import mabrurPrayerListImage from '../assets/images/projects/mabrur/prayer-list.webp';
import mabrurPrayerDetailImage from '../assets/images/projects/mabrur/prayer-detail.webp';
import stoCarbonVerifierImage from '../assets/images/projects/stocarbon/verifier-dashboard.webp';
import stoCarbonSplashImage from '../assets/images/projects/stocarbon/splash.webp';
import { supplementaryProjectWorkflows } from './projectWorkflows';

export type ProjectCategory = 'iOS Development' | 'Flutter Development' | 'AI / ML Engineering' | 'Backend Engineering' | 'Software Engineering';
export type GalleryTone = 'paper' | 'blush' | 'surface' | 'sage' | 'ink';

export interface ProjectGalleryImage {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  /** Optional presentation frame used in project covers and gallery previews. */
  frame?: 'phone' | 'laptop' | 'none';
  /** Older readers can still render a generic phone frame. */
  frameStyle?: 'ios' | 'android';
}

export interface ProjectWorkflowRoute {
  title: string;
  description: string;
  technologies?: string[];
}

export interface ProjectWorkflowStep {
  title: string;
  description: string;
  reason?: string;
  technologies?: string[];
}

export interface ProjectDatasetStat {
  value: string;
  label: string;
}

export interface ProjectDataset {
  title: string;
  summary: string;
  stats: ProjectDatasetStat[];
  note?: string;
}

export interface ProjectWorkflow {
  rationale?: string;
  intro: string;
  dataset?: ProjectDataset;
  routes: ProjectWorkflowRoute[];
  convergence: string;
  steps: ProjectWorkflowStep[];
  output: string;
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
  workflow?: ProjectWorkflow;
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

const projectRecords: Project[] = [
  {
    id: 'sprout', slug: 'sprout', title: 'Sprout', tagline: 'Guided reflection, grounded in emotional awareness',
    description: 'A self-reflection journaling app with writing prompts and emotion check-ins, followed by weekly summaries of emotional patterns and possible triggers.',
    categories: ['iOS Development', 'AI / ML Engineering', 'Backend Engineering'], platforms: ['iOS'],
    technologies: ['SwiftUI', 'SwiftData', 'Core ML', 'Foundation Models', 'Speech', 'AVFoundation', 'Go', 'FastAPI', 'Qdrant', 'Ollama', 'bge-m3', 'Docker'],
    role: 'iOS Developer · AI Engineer · Backend', timeline: '2026', featured: true,
    problem: 'People who journal for self-reflection may stop when faced with a blank page or struggle to name their emotions precisely. Without structured feedback across entries, it can be difficult to recognize longer-term emotional patterns and recurring triggers.',
    solution: 'The iOS app combines guided prompts and user-selected emotion labels with local valence suggestions. Weekly summaries use a separate Go gateway and FastAPI worker with Qdrant retrieval; a distinct Apple Foundation Models path can generate reflective feedback when available.',
    features: ['Guided journal prompts', 'User-selected emotion and intensity', 'Core ML valence suggestion with lexical fallback', 'Weekly summary and retrieval workflow', 'Availability-gated Apple Foundation Models feedback'],
    architecture: { summary: 'The SwiftUI client stores journal data locally and calls a Go API gateway for weekly summaries. A separate FastAPI worker handles retrieval and narrative generation; a separate on-device Foundation Models service provides optional reflective feedback.' },
    workflow: {
      rationale: 'People who journal for self-reflection may stop when faced with a blank page or struggle to name their emotions precisely. Without structured feedback across entries, it can be difficult to recognize longer-term emotional patterns and recurring triggers.',
      intro: 'Guided journaling is supported by local emotion suggestions, remote weekly summaries, and optional on-device reflection.',
      routes: [
        { title: 'Guided journal entry', description: 'The iOS app stores entries locally and lets the user choose an emotion and intensity.', technologies: ['SwiftUI', 'SwiftData'] },
        { title: 'Weekly summary service', description: 'A Go gateway sends summary requests to a separate FastAPI worker with retrieval and narrative generation.', technologies: ['Go', 'FastAPI', 'Qdrant', 'Ollama'] },
        { title: 'Optional reflection', description: 'A separate Apple Foundation Models path can provide feedback when the required device capability is available.', technologies: ['Foundation Models'] },
      ],
      convergence: 'Model suggestions are presented alongside the user’s own emotion selection; weekly summaries and optional feedback are separate paths.',
      steps: [
        { title: 'Write a guided entry', description: 'Use a prompt to help shape a journal entry and save it in the iOS app.' },
        { title: 'Choose an emotion', description: 'Record a self-selected emotion and intensity; local valence analysis can offer a separate suggestion.', reason: 'Keeping the selected emotion distinct from model output preserves the user’s self-report.' },
        { title: 'Build a weekly summary', description: 'Send the relevant entries through the Go gateway to the retrieval and narrative worker.' },
        { title: 'Request optional reflection', description: 'Use the on-device Foundation Models path when the operating system and device support it.' },
      ],
      output: 'Locally stored journal entries, a weekly summary through the separate service, and optional on-device reflection when available.',
    },
  },
  {
    id: 'foamy', slug: 'foamy', title: 'Foamy (MySkin)', tagline: 'Skincare analysis and routine companion',
    description: 'A skincare companion for people managing facial skin concerns, combining product label scanning and ingredient lookup with product comparisons and progress journaling.',
    categories: ['iOS Development'], platforms: ['iOS'], technologies: ['SwiftUI', 'SwiftData', 'Vision', 'URLSession', 'Combine'],
    role: 'iOS Developer', timeline: '2026', featured: true,
    problem: 'People managing facial skin concerns can find it difficult to compare product information and track skin changes over time, making product choices uncertain and progress hard to review.',
    solution: 'Foamy uses Vision text recognition to turn product-label photos into searchable text, then brings product and ingredient lookup together with a locally stored skin journal and comparison history.',
    features: ['Camera capture and product-label OCR', 'Product search and ingredient details', 'Product comparison history', 'Routine and journey notes with progress photos'],
    architecture: { summary: 'SwiftUI feature flows connect camera capture and Vision OCR to product and ingredient APIs. SwiftData models persist profiles, tracked products, comparisons, skincare journeys, milestones, entries, and progress photos.' },
    contributions: [
      'Developed the iOS app across product scanning, product information, comparison, and skin-journaling flows.',
      'Integrated Vision text recognition with product and ingredient lookup APIs.',
      'Built SwiftData-backed records for profiles, tracked products, comparisons, skincare journeys, entries, and progress photos.',
    ],
  },
  {
    id: 'hichef', slug: 'hichef', title: 'HiChef', tagline: 'From recipe pages to guided cooking steps',
    description: 'An iOS cooking assistant that imports online recipes, breaks instructions into smaller steps, and supports voice-guided cooking.',
    categories: ['iOS Development', 'AI / ML Engineering'], platforms: ['iOS'],
    technologies: ['SwiftUI', 'SwiftData', 'Foundation Models', 'NaturalLanguage', 'Speech', 'AVFoundation'],
    role: 'iOS Developer', timeline: '2026', featured: true,
    problem: 'Intermediate home cooks can struggle to follow online recipes when instructions are complex or cluttered, and manually handling a phone is inconvenient when cooking leaves their hands occupied.',
    solution: 'HiChef extracts recipe information from webpages, stores recipes locally, and refines instructions into smaller steps. Speech recognition and spoken playback support hands-free navigation while cooking.',
    features: ['Recipe URL import and webpage extraction', 'Structured ingredient and instruction data', 'Instruction breakdown into smaller steps', 'Indonesian speech recognition and text-to-speech controls'],
    architecture: { summary: 'A recipe-import pipeline extracts relevant webpage sections and uses Apple Foundation Models to structure recipe content. SwiftData stores recipes; NaturalLanguage helps refine instructions for the speech-guided cooking flow.' },
    contributions: [
      'Developed the iOS recipe-import flow to extract recipe content from webpages.',
      'Implemented recipe structuring and instruction breakdown using Apple Foundation Models and NaturalLanguage.',
      'Built local recipe persistence with SwiftData and Indonesian speech-guided controls for hands-free cooking.',
    ],
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
    contributions: [
      'Built trip setup for mountain, duration, and group-size inputs.',
      'Implemented conditional gear selection and quantity calculation from the trip details.',
      'Developed an editable packing checklist with packed state and functional or zone-based grouping.',
    ],
  },
  {
    id: 'step-up', slug: 'step-up', title: 'Step Up', tagline: 'Small movement breaks, built into the day',
    description: 'An iOS app for short guided movement breaks, with timed sessions and Live Activity support.',
    categories: ['iOS Development'], platforms: ['iOS'],
    technologies: ['SwiftUI', 'ActivityKit', 'WidgetKit'],
    role: 'iOS Developer', timeline: '2026', featured: true,
    problem: 'Desk workers and students may spend long stretches seated and find it difficult to build a consistent movement habit.',
    solution: 'Step Up pairs guided stretch plans with timed sessions. The active timer can appear in a Live Activity and a home-screen widget.',
    features: ['Guided stretch plans and movement steps', 'Timed activity sessions', 'Live Activity and WidgetKit support'],
    architecture: { summary: 'The SwiftUI app coordinates guided exercise and timer flows with ActivityKit and a WidgetKit extension.' },
    contributions: ['Built the iOS guided stretch-plan and timed exercise-session flows.'],
  },
  {
    id: 'ppt-generator', slug: 'ppt-generator', title: 'PPT Generator', tagline: 'From source material to editable presentation decks',
    description: 'A backend RAG path retrieves relevant passages from provided text, while a separate web-research path gathers external sources. An outline-first workflow turns that context into a structured, editable presentation.',
    categories: ['AI / ML Engineering', 'Backend Engineering', 'Software Engineering'], platforms: ['Web'],
    technologies: ['Python', 'FastAPI', 'LangChain', 'Hugging Face Embeddings', 'FAISS', 'SearXNG', 'Crawl4AI', 'Playwright', 'React', 'Vite', 'TypeScript', 'Server-Sent Events'],
    role: 'AI Engineer · Telkom Indonesia', featured: false,
    problem: 'Creating a research-backed deck means finding useful evidence, deciding how it supports the story, and turning that story into slides people can review. When research and slide writing happen in separate tools, context can get lost between those steps and the generated deck is harder to inspect as it takes shape.',
    solution: 'The backend prepares generation context through two paths. Its RAG API accepts source text, splits it into 700-character chunks with a 70-character overlap, embeds the chunks, and stores them in an in-memory FAISS index. It then retrieves the 10 passages most similar to the combined prompt and topic. A separate web-research path searches with SearXNG and extracts page content with Crawl4AI and Playwright. The React interface uses the unified generation endpoint for web research: it presents an outline first, streams slides as they are generated, and lets users preview and edit the result before exporting HTML or PowerPoint.',
    features: ['Split source text into overlapping chunks, embed it, and retrieve the 10 closest passages with FAISS', 'Discover web sources through SearXNG and extract page content with Crawl4AI and Playwright', 'Create a presentation outline before generating slide content', 'Stream the outline and completed slides to the interface over Server-Sent Events', 'Choose from four slide design templates and review or edit the presentation', 'Export the result as PowerPoint or editable HTML'],
    architecture: { summary: 'The FastAPI backend includes a RAG path that embeds source text and retrieves the 10 closest chunks from an in-memory FAISS index, plus a web-research path that searches with SearXNG and extracts pages with Crawl4AI and Playwright. The unified web flow uses researched context to generate an outline, then creates slides one at a time. A React and TypeScript frontend receives progress and slide updates over Server-Sent Events and supports preview, editing, and export.' },
    workflow: {
      rationale: 'Research context and story structure solve different parts of the task. Retrieving or gathering evidence first, then planning the outline before drafting slides, makes the material and intended narrative easier to review.',
      intro: 'The backend accepts source text for retrieval and can gather web research; the unified web flow makes its outline and slide progress visible as the deck is generated.',
      routes: [
        { title: 'Source-text retrieval', description: 'The backend splits supplied text into 700-character chunks with 70 characters of overlap, embeds them, and retrieves the 10 closest passages for the prompt and topic through FAISS. Overlap keeps nearby text available when context crosses a chunk boundary.', technologies: ['LangChain', 'Hugging Face Embeddings', 'FAISS'] },
        { title: 'Web research', description: 'The research path searches for relevant pages with SearXNG, then extracts page content with Crawl4AI and Playwright.', technologies: ['SearXNG', 'Crawl4AI', 'Playwright'] },
      ],
      convergence: 'Retrieved or researched context is passed into presentation generation. The unified web flow uses its web-research context for the outline and slide stream.',
      steps: [
        { title: 'Build the outline', description: 'The LLM proposes a sequence of slides from the prompt and gathered research context.', reason: 'Reviewing the story structure before slide writing makes the planned narrative visible early.' },
        { title: 'Generate slides progressively', description: 'The system creates slides one at a time and sends each completed slide to the interface.', reason: 'Progressive updates let users follow the generation and inspect slides as they arrive.', technologies: ['Server-Sent Events'] },
        { title: 'Preview and edit', description: 'The web interface displays the outline and generated slides, then lets users review and adjust the presentation.', technologies: ['React', 'TypeScript'] },
        { title: 'Export the deck', description: 'Generate a PowerPoint or editable HTML presentation.', technologies: ['HTML', 'PPTX'] },
      ],
      output: 'An editable presentation available as HTML or PowerPoint.',
    },
    contributions: [
      'Implemented the FastAPI backend and its source-text RAG path, including overlapping text chunks, Hugging Face embeddings, and FAISS similarity retrieval.',
      'Built the web research path with SearXNG, Crawl4AI, and Playwright, and the outline-first slide-generation workflow.',
      'Developed the React and TypeScript interface for templates, Server-Sent Events progress, slide preview and editing, and HTML or PowerPoint export.',
    ],
    links: [
      { label: 'Backend source (private)', href: 'https://github.com/brianashari18/ppt-generator', kind: 'github' },
      { label: 'Frontend source (private)', href: 'https://github.com/brianashari18/ppt-generator-frontend', kind: 'github' },
    ],
  },
  {
    id: 'document-formatting', slug: 'document-formatting', title: 'Excel AutoFormatting', tagline: 'Consistent formatting for Excel-based question sets',
    description: 'An Excel automation workflow that standardizes question documents with LLM-assisted processing while keeping embedded images and cross-references in view.',
    categories: ['AI / ML Engineering', 'Software Engineering'], platforms: ['Python · Excel'],
    technologies: ['Python', 'FastAPI', 'Excel processing', 'LLM workflows'],
    role: 'AI Engineer · Telkom Indonesia', featured: false,
    problem: 'Question spreadsheets can contain inconsistent headers and layouts alongside embedded images and references between questions. Manual cleanup risks losing structure or applying different formatting across a workbook.',
    solution: 'The workflow preprocesses each workbook, detects metadata and headers, then groups question text with enough surrounding context for LLM-assisted normalization. It maps the normalized fields into a target template and handles embedded images and cross-references as part of the workbook output.',
    features: ['Preprocess workbooks and detect metadata and header rows', 'Group question text into context-aware chunks for LLM processing', 'Normalize fields and map them to a target Excel template', 'Handle embedded images during template insertion', 'Detect and preserve cross-references between questions'],
    architecture: { summary: 'Workbook preprocessing identifies sheet structure and question context. LLM-assisted normalization prepares consistent fields for template mapping; image reinsertion and cross-reference handling preserve workbook elements beyond plain text.' },
    workflow: {
      rationale: 'Question spreadsheets can contain inconsistent headers and layouts alongside embedded images and references between questions. Manual cleanup risks losing structure or applying different formatting across a workbook.',
      intro: 'The workbook is inspected before its question content is normalized and inserted into a standard report template.',
      routes: [
        { title: 'Source workbook', description: 'The input can contain sheet metadata, varied headers, question text, embedded images, and cross-references.' },
      ],
      convergence: 'Detected structure and question context move through the formatting pipeline.',
      steps: [
        { title: 'Preprocess and inspect', description: 'Read workbook metadata and detect header rows.', reason: 'The workflow needs the sheet structure before it can map fields into a template.' },
        { title: 'Prepare question context', description: 'Group related question text into contextual chunks and inject that context for processing.', reason: 'Keeping nearby question context together helps the LLM process long or linked question content.' },
        { title: 'Normalize fields', description: 'Use the LLM response to extract information and standardize column names.', technologies: ['Telkom LLM'] },
        { title: 'Fill the report template', description: 'Load the target template and insert processed text.', technologies: ['FastAPI'] },
        { title: 'Restore workbook elements', description: 'Reinsert embedded images and handle references between questions.' },
      ],
      output: 'A consistently formatted Excel workbook with its question context and embedded elements retained.',
    },
    contributions: [
      'Implemented the Python and FastAPI workbook workflow, from metadata and header detection through contextual question chunking and LLM-assisted normalization.',
      'Built the template-mapping stage to place normalized question content into a consistent Excel output.',
      'Handled embedded-image reinsertion and cross-reference preservation in the formatted workbook.',
    ],
    links: [{ label: 'GitHub repository', href: 'https://github.com/brianashari18/document-formatting', kind: 'github' }],
  },
  {
    id: 'ifrs-document-checker', slug: 'ifrs-document-checker', title: 'IFRS DocumentChecker', tagline: 'From contract documents to structured IFRS 15 data',
    description: 'An OCR and LLM-assisted document workflow that extracts selected information from PKS and BAST files, then consolidates the results into an Excel workbook for review.',
    categories: ['AI / ML Engineering', 'Backend Engineering', 'Software Engineering'], platforms: ['Web · Excel'],
    technologies: ['OCR', 'Multimodal AI', 'LLM workflows', 'Excel processing'],
    role: 'AI Engineer · Telkom Indonesia', featured: false,
    problem: 'Preparing IFRS 15 data can require reviewing information spread across long contract and handover documents, then manually transferring it into a consistent spreadsheet. The presentation identifies that manual extraction as slow and vulnerable to missed details.',
    solution: 'The workflow uses OCR to make PDF and image documents searchable, processes extracted text in context-aware chunks, and prompts an LLM to identify selected fields. The extracted information is consolidated and checked in an Excel template for review.',
    features: ['Extract text from PDF and image documents with OCR', 'Process PKS and BAST content in manageable context windows', 'Use LLM prompts to identify selected IFRS 15 information', 'Consolidate and validate extracted fields in an Excel workbook'],
    architecture: { summary: 'Source documents pass through OCR, then extracted text is chunked for LLM-based field extraction. The results are consolidated and checked against a structured Excel output.' },
    workflow: {
      rationale: 'Preparing IFRS 15 data can require reviewing information spread across long contract and handover documents, then manually transferring it into a consistent spreadsheet. The presentation identifies that manual extraction as slow and vulnerable to missed details.',
      intro: 'PKS and BAST documents follow type-specific extraction routes, then join for consolidation and validation.',
      routes: [
        { title: 'PKS documents', description: 'OCR converts the PDF or image content to text for PKS information extraction.', technologies: ['OCR', 'Multimodal AI'] },
        { title: 'BAST documents', description: 'OCR converts the PDF or image content to text for BAST information extraction.', technologies: ['OCR', 'Multimodal AI'] },
      ],
      convergence: 'Text from both document routes enters the contextual extraction and reporting stages.',
      steps: [
        { title: 'Chunk long documents', description: 'Split OCR text into manageable sections for extraction.', reason: 'Contextual chunking and prompting are used to process long documents and varied information.' },
        { title: 'Extract requested fields', description: 'Prompt the LLM to identify the selected contract information.', technologies: ['LLM workflows'] },
        { title: 'Consolidate and validate', description: 'Bring extracted fields together and check them before populating the report.' },
        { title: 'Fill the Excel template', description: 'Place the reviewed information into the predefined workbook template.', technologies: ['Excel processing'] },
      ],
      output: 'A structured Excel report ready for review.',
    },
    contributions: [
      'Implemented OCR processing for PDF and image documents, preparing their content for extraction.',
      'Built the context-aware chunking and LLM extraction flow for selected fields across PKS and BAST documents.',
      'Implemented consolidation, validation, and output of extracted information in the Excel template.',
    ],
  },
  {
    id: 'face-lock', slug: 'face-lock', title: 'Face Lock', tagline: 'Face-based access monitoring across web and mobile clients',
    description: 'Face Lock combines face-based verification with access records and monitoring clients across a Python recognition service, Go API, Flutter app, and React dashboard.',
    categories: ['AI / ML Engineering', 'Backend Engineering', 'Flutter Development', 'Software Engineering'], platforms: ['Web', 'Mobile'],
    technologies: ['InsightFace', 'ArcFace', 'Python', 'Go', 'Gin', 'MySQL', 'Flutter', 'React'],
    role: 'AI Engineer · Full-stack Developer', featured: false,
    solution: 'The recognition service compares face embeddings for access verification. Separate Go, Flutter, and React repositories cover API access, mobile monitoring, and web-based authorization and dashboards.',
    features: ['Face detection and embedding-based verification', 'Access logs and user-management flows', 'Mobile access monitoring and notification views', 'Web dashboard for authorization and access activity', 'Backend event and notification flows'],
    architecture: { summary: 'A Python recognition service uses InsightFace/ArcFace for face detection and embeddings. A Go/Gin API with MySQL handles user and access-log data; WebSocket and Firebase Cloud Messaging support event and notification flows for the Flutter client and React dashboard.' },
    contributions: [
      'Built the Python face-recognition service using InsightFace and ArcFace for face detection and embedding-based verification.',
      'Implemented the Go/Gin API and MySQL-backed access-log and user-management flows, including WebSocket and Firebase Cloud Messaging support.',
      'Developed the Flutter monitoring client and React dashboard for access activity, authorization, and alert-related views.',
    ],
    links: [
      { label: 'Face recognition service', href: 'https://github.com/brianashari18/face_lock_ai', kind: 'github' },
      { label: 'Flutter mobile app', href: 'https://github.com/evlynnn/Frontend_Mobile_ComPro', kind: 'github' },
      { label: 'Backend API', href: 'https://github.com/Althaf747/ComputingProject-Backend', kind: 'github' },
      { label: 'Web dashboard', href: 'https://github.com/evlynnn/frontend-web-compro', kind: 'github' },
    ],
  },
  {
    id: 'flicknfit', slug: 'flicknfit', title: 'FlickNFit', tagline: 'Fashion discovery with scan and wardrobe flows',
    description: 'A Flutter mobile client paired with a Go API for product discovery, saved items, and scan-based style features.',
    categories: ['Flutter Development', 'Backend Engineering', 'Software Engineering'], platforms: ['Mobile', 'API'],
    technologies: ['Flutter', 'Dart', 'Go', 'Fiber', 'GORM', 'MySQL', 'Firebase'],
    role: 'Flutter & Backend Developer', featured: false, thumbnail: flickNFitWardrobeImage,
    gallery: [
      { src: flickNFitWardrobeImage, alt: 'FlickNFit wardrobe screen with a composed outfit and individual clothing items', title: 'Wardrobe outfit', caption: 'A saved outfit assembled from individual clothing items.', frame: 'none' },
      { src: flickNFitProductDetailsImage, alt: 'FlickNFit product detail screen showing a clothing image, price, rating, and product actions', title: 'Product details', caption: 'Review a fashion item and its details before saving it.', frame: 'phone', frameStyle: 'android' },
    ],
    solution: 'The mobile source includes screens for product and brand browsing, saved items, scan history, and style recommendations. A separate Go service provides account, catalog, and review APIs; the source also contains sample data, so live connections for every client screen are not established.',
    features: ['Browse products, brands, and categories', 'Save products and manage wardrobe items', 'Review body and face scan history', 'Explore style recommendations', 'Account, product, and review API flows'],
    architecture: { summary: 'The Flutter client defines screens for product discovery, saved wardrobe items, scan history, and recommendations. A Go/Fiber service provides account, catalog, and review APIs using GORM and MySQL. The repositories contain sample data, so live integration is not established for every client flow.' },
    contributions: [
      'Developed the Flutter client screens for product and brand browsing, saved items, wardrobe, scan history, and style recommendations.',
      'Implemented the Go/Fiber backend with GORM and MySQL for account, catalog, and review API flows.',
    ],
    links: [
      { label: 'Flutter mobile app', href: 'https://github.com/FlicknFit/flicknfit-mobile', kind: 'github' },
      { label: 'Go backend API', href: 'https://github.com/brianashari18/flicknfit-backend', kind: 'github' },
    ],
  },
  {
    id: 'fitspace', slug: 'fitspace', title: 'FitSpace', tagline: 'Sports venue discovery and booking across web and mobile',
    description: 'A web and Flutter mobile project for finding sports venues, viewing available fields, and managing bookings, with a Python service for venue recommendations.',
    categories: ['Flutter Development', 'Backend Engineering', 'Software Engineering'], platforms: ['Web', 'Mobile'],
    technologies: ['React', 'JavaScript', 'Flutter', 'Dart', 'Python', 'Flask', 'geopy', 'Firebase', 'Maps'],
    role: 'Web, Mobile & Backend Developer', featured: false, thumbnail: fitSpaceDiscoveryImage,
    gallery: [
      { src: fitSpaceDiscoveryImage, alt: 'FitSpace venue discovery screen with sport filters, nearby courts, ratings, and prices', title: 'Venue discovery', caption: 'Browse nearby venues and compare sports, ratings, and starting prices.', frame: 'phone', frameStyle: 'android' },
      { src: fitSpaceScheduleImage, alt: 'FitSpace booking screen with a weekly calendar and hourly court availability', title: 'Booking schedule', caption: 'A calendar and time-slot view for selecting a court booking.', frame: 'none' },
      { src: fitSpaceSplashImage, alt: 'FitSpace app splash screen with the FitSpace brand mark', title: 'App launch', caption: 'The mobile app launch screen.', frame: 'phone', frameStyle: 'android' },
    ],
    solution: 'The web and mobile clients include venue and field browsing, booking flows, payment confirmation, reviews, and venue-management screens. The Python service fetches venue data and ranks recommendations using geographic distance calculations.',
    features: ['Browse nearby and recommended courts', 'View venue details and field schedules', 'Create and review bookings', 'Manage venues, fields, and user reviews', 'Recommend venues using geographic distance calculations'],
    architecture: { summary: 'React and Flutter clients provide venue browsing, schedules, bookings, reviews, and management screens. A Python/Flask recommendation service fetches venue data and ranks options using geographic distance calculations.' },
    contributions: [
      'Developed the React web client for venue discovery, schedules, bookings, reviews, and venue management.',
      'Built the Flutter mobile client for browsing venues and fields and managing booking flows.',
      'Implemented the Python/Flask recommendation service to fetch venue data and rank options using geographic distance calculations.',
    ],
    links: [
      { label: 'Website frontend', href: 'https://github.com/brianashari18/fitspace_sports_venue_booking_website_frontend', kind: 'github' },
      { label: 'Flutter mobile app', href: 'https://github.com/brianashari18/fitspace_sports_venue_booking_mobile', kind: 'github' },
      { label: 'Venue recommendation service', href: 'https://github.com/brianashari18/fitspace_sports_venue_booking_ai', kind: 'github' },
    ],
  },
  {
    id: 'stocarbon', slug: 'stocarbon', title: 'StoCarbon', tagline: 'Mobile workflows for carbon plot verification',
    description: 'A Flutter app with seller and verifier flows for creating carbon plots, managing zones, and reviewing related transactions.',
    categories: ['Flutter Development', 'Software Engineering'], platforms: ['Mobile'],
    technologies: ['Flutter', 'Dart', 'Firebase Authentication', 'Google Sign-In', 'fl_chart'],
    role: 'Flutter Developer', featured: false, thumbnail: stoCarbonVerifierImage,
    gallery: [
      { src: stoCarbonVerifierImage, alt: 'StoCarbon verifier dashboard showing plot review counts and a monthly performance chart', title: 'Verifier dashboard', caption: 'A summary screen for pending, approved, and rejected plot reviews.', frame: 'phone', frameStyle: 'android' },
      { src: stoCarbonSplashImage, alt: 'StoCarbon app splash screen with its carbon-stock trading platform mark', title: 'App launch', caption: 'The mobile app launch screen.', frame: 'phone', frameStyle: 'android' },
    ],
    solution: 'The Flutter source separates seller plot and zone screens from verifier review screens, with supporting region, team, and transaction views. The repository README is a starter template, so release and live-service status are not established.',
    features: ['Seller plot and zone screens', 'Verifier review queue screens', 'Region and team records', 'Transaction history and detail views'],
    architecture: { summary: 'The Flutter client separates seller plot and zone workflows from verifier review screens, with supporting region, team, and transaction-history views.' },
    contributions: [
      'Developed the Flutter seller workspace for plot creation and zone management.',
      'Built the verifier review-queue screens and plot review flow.',
      'Implemented supporting region, team, and transaction-history views.',
    ],
    links: [{ label: 'GitHub repository', href: 'https://github.com/brianashari18/stocarbon_mobile_app', kind: 'github' }],
  },
  {
    id: 'music-information-retrieval-ta', slug: 'music-information-retrieval-ta', title: 'Final Thesis',
    tagline: 'Indonesian pop chord recognition with LSTM and instrument separation',
    description: 'A Music Information Retrieval study on chord extraction from Indonesian pop audio. The model predicts one of 24 major/minor triad classes for each known, aligned segment; it does not detect chord boundaries or directly predict Roman-numeral functions.',
    categories: ['AI / ML Engineering', 'Software Engineering'], platforms: ['Python', 'Jupyter Notebook'],
    technologies: ['Python', 'PyTorch', 'librosa', 'Demucs', 'HPSS', 'MFCC', 'Chromagram', 'RNN', 'GRU', 'LSTM', 'BiLSTM', 'Transformer'],
    role: 'Researcher · ML Engineer', featured: false,
    problem: 'The study addresses a research gap identified in its paper: Indonesian pop lacked a frame-level chord-recognition baseline, while a small annotated dataset made the task vulnerable to class imbalance, vocal and percussion noise, and overfitting in high-capacity models.',
    solution: 'I built a data-centric Automatic Chord Extraction pipeline around a curated, manually annotated corpus of 50 Indonesian pop songs (about 3.2 hours and 4,561 labeled segments). It aligns chord labels with audio, tests Demucs stem separation and Harmonic-Percussive Source Separation (HPSS), pools temporal features, and compares audio representations and sequence models. The final classifier uses chromagram sequences with a unidirectional LSTM to predict 24 major/minor triad classes within provided segment boundaries.',
    features: [
      'Curate chord labels for 50 Indonesian pop songs, totaling about 3.2 hours and 4,561 annotated segments',
      'Predict one of 24 major/minor triad chord classes for each aligned audio segment',
      'Compare raw audio and Demucs-separated instrument mixes, with HPSS to reduce percussive interference',
      'Evaluate pooled Constant-Q Chromagram and MFCC representations',
      'Compare recurrent and Transformer configurations, then use a unidirectional LSTM for the final sequence model',
    ],
    architecture: { summary: 'Chord and time annotations form the reference labels. In parallel, the audio path separates instrument stems with Demucs, applies HPSS and median temporal pooling, and extracts chromagram or MFCC features. The final chromagram sequence feeds a PyTorch LSTM; experiments compare features, model capacity, and stem combinations.' },
    contributions: [
      'Built the chord-data pipeline: collecting chord sheets, analyzing keys and harmonic context, cleaning labels, mapping song sections, and aligning chord events with audio.',
      'Implemented the audio-processing path for Demucs stem separation, HPSS, temporal pooling, and MFCC/chromagram feature extraction.',
      'Developed the PyTorch experiments comparing feature representations, instrument inputs, and RNN, GRU, LSTM, BiLSTM, and Transformer configurations.',
    ],
    engineeringChallenges: [
      'A small dataset and imbalanced chord classes limited generalization; the study used Focal Loss and reported cross-validation results.',
      'Vocals and percussion can obscure harmonic content, so the pipeline tested stem separation, HPSS, and temporal pooling as signal-processing interventions.',
      'Higher-capacity BiLSTM and Transformer configurations overfit in this low-resource setting, motivating a unidirectional LSTM for the final classifier.',
    ],
    results: [
      'In the paper’s reported 5-fold, song-level comparison, guitar+piano input reached 57.9 ± 9.3% mean validation accuracy, compared with 56.8 ± 11.5% for raw audio.',
      'The guitar+piano+bass mix achieved the highest reported majmin chord-quality score: 0.596 ± 0.090, compared with 0.590 ± 0.084 for raw audio. The best input differed by metric.',
    ],
    links: [
      { label: 'Chord data scraper', href: 'https://github.com/brianashari18/ta-chord-scrapping', kind: 'github' },
      { label: 'Chord data cleaning', href: 'https://github.com/brianashari18/ta-scrapping-part-cleaning', kind: 'github' },
      { label: 'Chord section mapping', href: 'https://github.com/brianashari18/ta-scrapping-part-mapping', kind: 'github' },
      { label: 'Time-alignment cleaning', href: 'https://github.com/brianashari18/ta-time-alignment-cleaning', kind: 'github' },
      { label: 'Chord and timing merger', href: 'https://github.com/brianashari18/ta-time-alignment-merging', kind: 'github' },
      { label: 'Audio source separation', href: 'https://github.com/brianashari18/ta-instrument-separation', kind: 'github' },
      { label: 'Audio feature extraction', href: 'https://github.com/brianashari18/ta-song-extraction', kind: 'github' },
      { label: 'Sequence-model experiments', href: 'https://github.com/brianashari18/ta-model', kind: 'github' },
    ],
  },
  {
    id: 'spatiotemporal-drowsiness-detection', slug: 'spatiotemporal-drowsiness-detection', title: 'Spatiotemporal Drowsiness Detection',
    tagline: 'Data Slayer 2025 · Preliminary 4th of 163 · Final Top 4',
    description: 'A team computer-vision entry for Data Slayer 3.0, classifying one-second in-car video sequences as drowsy or non-drowsy. Team belikopidulu placed 4th out of 163 teams in the preliminary round and reached the top 4 in the final.',
    categories: ['AI / ML Engineering'], platforms: ['Kaggle'],
    technologies: ['VideoMAE', 'BiLSTM'], role: 'AI/ML team collaborator', timeline: '2025', featured: false,
    problem: 'Data Slayer 3.0 challenged teams to classify one-second in-car clips as drowsy or non-drowsy. The training set covered 15 subjects, with eight videos per subject across front and side camera views. Drowsiness examples showed microsleep or yawning; non-drowsiness examples showed focus or talking. The task was evaluated with Macro F1.',
    solution: 'The team stabilized region crops with a Union Bounding Box to limit frame-to-frame crop jitter, then sampled 16 frames from each input clip for a VideoMAE + BiLSTM approach. Candidate models used augmentation and staged fine-tuning, were compared with five-fold evaluation, and were combined for inference with horizontal-flip test-time augmentation.',
    features: [
      'Classified drowsiness (microsleep or yawning) versus non-drowsiness (focus or talking)',
      'Training data from 15 subjects and front/side camera views',
      'One-second test sequences: 30 frames at 30 FPS and 1280 × 720',
      'Union Bounding Box crop stabilization and 16-frame temporal input',
    ],
    architecture: { summary: 'Video clip → Union Bounding Box crop → 16-frame sequence → VideoMAE + BiLSTM. Training used augmentation and staged fine-tuning with five-fold evaluation; inference combined fold models with horizontal-flip test-time augmentation. The competition used Macro F1, with the qualifying score weighted 65% private leaderboard and 35% notebook review.' },
    workflow: {
      rationale: 'The competition asked teams to detect driver drowsiness from short in-car video sequences, where the label depends on cues captured across multiple frames.',
      intro: 'The qualifying task mapped each one-second sequence to one of two labels. The team explored a temporal video-modeling pipeline using stabilized crops and sampled frames.',
      dataset: {
        title: 'Data Slayer 3.0 competition dataset',
        summary: 'The training data covers microsleep and yawning as drowsiness, and focus and talking as non-drowsiness. Each behavior is recorded from front and side camera views.',
        stats: [
          { value: '15', label: 'training subjects' },
          { value: '8 each', label: 'videos per subject' },
          { value: '2', label: 'camera views' },
          { value: '30', label: 'frames per test sequence' },
          { value: '30 FPS', label: 'one-second clips' },
        ],
        note: 'The competition used Macro F1. The qualifying score combined private-leaderboard performance (65%) with notebook review (35%); this is separate from the five-fold mean F1 reported in the presentation.',
      },
      routes: [
        { title: 'Training videos', description: 'Fifteen subjects each have eight videos across two labels—drowsiness (microsleep or yawning) and non-drowsiness (focus or talking)—recorded from front and side views.', technologies: ['Binary classification', 'Front + side views'] },
        { title: 'Test sequences', description: 'Each unlabeled sequence contains 30 frames at 1280 × 720 resolution, recorded at 30 FPS for one second.', technologies: ['30 frames', '1280 × 720'] },
      ],
      convergence: 'The model predicts drowsiness or non-drowsiness for each sequence. The Kaggle qualifying score also included a review of the analysis notebook.',
      steps: [
        { title: 'Stabilize the region of interest', description: 'Use a Union Bounding Box to keep the crop region consistent across frames.', reason: 'The presentation identifies crop jitter as a source of unwanted position changes in the model input.' },
        { title: 'Sample a temporal input', description: 'Select 16 frames from each clip for the VideoMAE + BiLSTM approach.', technologies: ['VideoMAE', 'BiLSTM'] },
        { title: 'Fine-tune and compare models', description: 'Apply augmentation and staged fine-tuning, then evaluate candidate configurations with five-fold cross-validation.', technologies: ['Data augmentation', '5-fold evaluation'] },
        { title: 'Combine fold predictions', description: 'Aggregate predictions from the fold models and apply horizontal-flip test-time augmentation.', technologies: ['Ensemble inference', 'Horizontal-flip TTA'] },
      ],
      output: 'A sequence-level prediction for the competition’s drowsiness or non-drowsiness task.',
    },
    contributions: [
      'Worked with two teammates to explore candidate models and jointly decide which approaches to evaluate; model exploration was a shared team effort.',
    ],
    engineeringChallenges: [
      'The training set covers 15 subjects across front and side camera views, which bounds the evaluation data available to the team.',
      'Frame-to-frame crop jitter risked teaching the model position changes rather than drowsiness patterns.',
    ],
    results: [
      'Team belikopidulu placed 4th out of 163 teams in the Data Slayer 3.0 preliminary round.',
      'The team reached the top 4 in the Data Slayer 2025 final.',
      'The presentation reports a 91.66% mean F1 across five validation folds (range 0.7913–1.0000). This is the model’s cross-validation result, not its Kaggle leaderboard score.',
    ],
    links: [
      { label: 'Kaggle competition', href: 'https://www.kaggle.com/competitions/data-slayer-3/overview', kind: 'other' },
      { label: 'Competition presentation', href: 'https://canva.link/l4a69ckueamxrq6', kind: 'other' },
    ],
  },
  {
    id: 'e-wise', slug: 'e-wise', title: 'E-Wise', tagline: 'E-waste management and responsible disposal',
    description: 'A Flutter app for learning about responsible e-waste disposal, finding nearby e-bank collection points, requesting pickups, and managing reward points.',
    categories: ['Flutter Development', 'Software Engineering'], platforms: ['Android', 'iOS'],
    technologies: ['Flutter', 'Dart', 'Firebase Authentication', 'Cloud Firestore', 'FlutterMap', 'Geolocator'],
    role: 'Flutter Developer', featured: false, thumbnail: eWiseHomeImage,
    gallery: [
      { src: eWiseHomeImage, alt: 'E-Wise home screen with e-waste information, pickup, e-Bank, and WisePoint shortcuts', title: 'Home and services', caption: 'Entry points for e-waste education, collection, nearby e-banks, and points.', frame: 'phone', frameStyle: 'android' },
      { src: eWisePointsImage, alt: 'E-Wise WisePoint screen with a points balance, redeem and add actions, and an activity chart', title: 'WisePoint', caption: 'A points overview with redemption and activity information.', frame: 'phone', frameStyle: 'android' },
      { src: eWiseSplashImage, alt: 'E-Wise opening screen with its e-waste recycling mark', title: 'App launch', caption: 'The mobile app launch screen.', frame: 'phone', frameStyle: 'android' },
      { src: eWiseMapImage, alt: 'E-Wise pickup status screen with a map pin and nearby route context', title: 'Pickup status map', caption: 'A location view accompanies the e-waste pickup status.', frame: 'phone', frameStyle: 'android' },
    ],
    problem: 'E-Wise aims to reduce electronic waste, but responsible disposal involves several steps: learning how to handle e-waste, finding a collection point, arranging a handoff, and tracking the resulting points. The app brings those steps into one mobile experience.',
    solution: 'E-Wise combines educational content and e-bank discovery with location-aware pickup requests. Firebase Authentication and Cloud Firestore support account, pickup, chat, and WisePoint records.',
    features: [
      'Read educational content about e-waste and responsible disposal',
      'Search e-bank locations and view nearby collection points on a map',
      'Request e-waste pickup with size, address, schedule, and notes',
      'Review pickup status and WisePoint balance and history',
      'Redeem WisePoints through cash or e-wallet flows',
      'Use account, profile, and admin-chat screens',
    ],
    architecture: { summary: 'The Flutter app organizes screens and state with GetX controllers and repositories. Firebase Authentication handles account access, while Cloud Firestore stores user, e-bank, pickup, chat, point, and transaction records. Location and geocoding services support nearby e-bank discovery and pickup details.' },
    contributions: [
      'Developed the Flutter app across e-waste education, e-bank discovery, pickup requests, WisePoint, and support flows.',
      'Implemented location and map features to find nearby e-banks and prepare pickup details.',
      'Connected account access and user, pickup, chat, and point workflows to Firebase Authentication and Cloud Firestore.',
    ],
    links: [{ label: 'GitHub repository', href: 'https://github.com/brianashari18/e-wise', kind: 'github' }],
  },
  {
    id: 'mabrur-hajj-umrah', slug: 'mabrur-hajj-umrah', title: 'Mabrur Hajj & Umrah App',
    tagline: 'Prayer guidance and group tools for a pilgrimage companion',
    description: 'A mobile companion app concept for Hajj and Umrah, with prayer guidance and group communication.',
    categories: ['Software Engineering'], platforms: ['Mobile'], technologies: [], featured: false,
    thumbnail: mabrurPrayerHomeImage,
    gallery: [
      { src: mabrurLoginImage, alt: 'Mabrur sign-in screen with email and password fields', title: 'Sign in', caption: 'Entry point for accessing the Hajj and Umrah companion.', frame: 'phone', frameStyle: 'android' },
      { src: mabrurPrayerHomeImage, alt: 'Mabrur home screen with Hajj and Umrah prayer categories and a list of prayer topics', title: 'Prayer home', caption: 'Explore prayer topics from the app’s main screen.', frame: 'phone', frameStyle: 'android' },
      { src: mabrurPrayerListImage, alt: 'Mabrur screen listing prayer guidance for Hajj and Umrah', title: 'Prayer list', caption: 'Browse the collection of prayer guidance.', frame: 'phone', frameStyle: 'android' },
      { src: mabrurPrayerDetailImage, alt: 'Mabrur prayer detail screen displaying the selected prayer and supporting text', title: 'Prayer details', caption: 'Open an individual prayer to read its content.', frame: 'phone', frameStyle: 'android' },
    ],
    problem: 'The concept brings prayer guidance and group communication into a single Hajj and Umrah companion.',
    solution: 'A mobile app concept centered on prayer guidance, with group tools for pilgrimage coordination.',
    features: ['Browse prayer guidance', 'Read individual prayer details', 'Sign in to the companion app'],
  },
  {
    id: 'chat-app', slug: 'chat-app', title: 'Chat App', tagline: 'An early Flutter project built through a chat app',
    description: 'An early Flutter learning project exploring mobile app development through a chat experience.',
    categories: ['Flutter Development', 'Software Engineering'], platforms: ['Android', 'iOS'],
    technologies: ['Flutter', 'Dart'], role: 'Flutter Developer', featured: false, thumbnail: chatAppLoginImage,
    gallery: [
      { src: chatAppLoginImage, alt: 'Chat App sign-in screen with email and password fields', title: 'Login screen', caption: 'The supplied screen shows the sign-in entry point; this image set does not include a message thread.', frame: 'phone', frameStyle: 'android' },
    ],
    problem: 'This project began as a learning exercise: build a chat app to practice developing a mobile application with Flutter.',
    contributions: [
      'Developed the Flutter chat app as an early project for practicing mobile application development.',
    ],
  },
  {
    id: 'expense-tracker', slug: 'expense-tracker', title: 'Expense Tracker', tagline: 'Learning Flutter through daily expense tracking',
    description: 'A Flutter learning project built around recording and reviewing daily expenses.',
    categories: ['Flutter Development', 'Software Engineering'], platforms: ['Android', 'iOS'],
    technologies: ['Flutter', 'Dart'], role: 'Flutter Developer', featured: false, thumbnail: expenseTrackerOverviewImage,
    gallery: [
      { src: expenseTrackerOverviewImage, alt: 'Expense Tracker screen showing sample entries for a Flutter course, cinema, and hiking', title: 'Expense list', caption: 'A sample list demonstrates how the app records and reviews daily spending.', frame: 'phone', frameStyle: 'android' },
    ],
    problem: 'This project was part of learning Flutter: tracking daily expenses offered a practical app flow to build and explore.',
    features: ['Record daily expenses', 'Review recorded expense entries'],
    contributions: [
      'Built the Flutter app flow for recording daily expenses and reviewing saved entries as a hands-on learning project.',
    ],
  },
  {
    id: 'meals-app', slug: 'meals-app', title: 'Meals App', tagline: 'Learning Flutter through recipes and meal planning',
    description: 'A Flutter learning project for discovering recipes and organizing meal plans.',
    categories: ['Flutter Development', 'Software Engineering'], platforms: ['Android', 'iOS'],
    technologies: ['Flutter', 'Dart'], role: 'Flutter Developer', featured: false, thumbnail: mealsCategoriesImage,
    gallery: [
      { src: mealsCategoriesImage, alt: 'Meals App category screen with cuisine and meal category cards', title: 'Recipe categories', caption: 'Explore recipe categories as part of a Flutter learning project.', frame: 'phone', frameStyle: 'android' },
      { src: mealsRecipeListImage, alt: 'Meals App recipe list displaying pasta and other sample dishes', title: 'Recipe collection', caption: 'Browse a list of dishes before opening an individual recipe.', frame: 'phone', frameStyle: 'android' },
      { src: mealsRecipeDetailImage, alt: 'Meals App recipe detail screen with a dish description and ingredient list', title: 'Recipe details', caption: 'Review a recipe and its ingredients on the detail screen.', frame: 'phone', frameStyle: 'android' },
    ],
    problem: 'This project was part of learning Flutter: recipe discovery and meal planning offered a practical product flow to build.',
    features: ['Browse recipes', 'Choose recipes for a meal plan', 'Review planned meals'],
    contributions: [
      'Developed the Flutter recipe-discovery and meal-planning flows as a hands-on learning project.',
    ],
  },
  {
    id: 'quiz-app', slug: 'quiz-app', title: 'Quiz App', tagline: 'Learning Flutter through a quiz app',
    description: 'A Flutter learning project built around a simple quiz experience.',
    categories: ['Flutter Development', 'Software Engineering'], platforms: ['Android', 'iOS'],
    technologies: ['Flutter', 'Dart'], role: 'Flutter Developer', featured: false, thumbnail: quizIntroImage,
    gallery: [
      { src: quizIntroImage, alt: 'Quiz App welcome screen with a Start Quiz button', title: 'Quiz introduction', caption: 'A welcome screen for starting a quiz.', frame: 'phone', frameStyle: 'android' },
      { src: quizQuestionImage, alt: 'Quiz App multiple-choice question about the building blocks of Flutter UI', title: 'Answer a question', caption: 'A multiple-choice question screen.', frame: 'phone', frameStyle: 'android' },
    ],
    problem: 'This project was part of learning Flutter: a simple quiz gave me a practical app flow to design and build.',
    features: ['Start a quiz', 'Answer questions', 'Finish a quiz session'],
    contributions: [
      'Developed the Flutter quiz experience as a hands-on learning project.',
    ],
  },
  {
    id: 'role-dice-app', slug: 'role-dice-app', title: 'Role Dice App', tagline: 'Learning Flutter through a role-playing dice roller',
    description: 'A Flutter learning project that simulates dice rolls for role-playing games.',
    categories: ['Flutter Development', 'Software Engineering'], platforms: ['Android', 'iOS'],
    technologies: ['Flutter', 'Dart'], role: 'Flutter Developer', featured: false, thumbnail: roleDiceIntroImage,
    gallery: [
      { src: roleDiceIntroImage, alt: 'Role Dice App opening screen with a yellow two-dot die', title: 'Dice roller', caption: 'The opening screen of a small Flutter dice-rolling learning project.', frame: 'phone', frameStyle: 'android' },
    ],
    problem: 'This project was part of learning Flutter: a dice roller provided a compact interactive app flow to design and build.',
    features: ['Roll a virtual die', 'View the simulated result'],
    contributions: [
      'Developed the Flutter dice-rolling experience as a hands-on learning project.',
    ],
  },
];

export const projects: Project[] = projectRecords.map((project) => {
  const workflow = project.workflow ?? supplementaryProjectWorkflows[project.id];
  return workflow ? { ...project, workflow } : project;
});

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
    { name: 'Flutter', evidence: 'Demonstrated', evidenceIds: ['e-wise', 'chat-app', 'expense-tracker', 'meals-app', 'quiz-app', 'role-dice-app', 'face-lock', 'flicknfit', 'fitspace', 'stocarbon'] },
    { name: 'Android development', evidence: 'Exploring', evidenceIds: [], evidenceNote: 'Area of interest' },
  ] },
  { name: 'AI & data', skills: [
    { name: 'OCR', evidence: 'Demonstrated', evidenceIds: ['telkom-indonesia'] },
    { name: 'LLM workflows', evidence: 'Demonstrated', evidenceIds: ['telkom-indonesia', 'ppt-generator', 'document-formatting'] },
    { name: 'Retrieval-augmented generation', evidence: 'Demonstrated', evidenceIds: ['telkom-indonesia', 'ppt-generator'] },
    { name: 'Core ML', evidence: 'Demonstrated', evidenceIds: ['sprout'] },
    { name: 'Python', evidence: 'Demonstrated', evidenceIds: ['ppt-generator', 'document-formatting', 'face-lock', 'fitspace'] },
  ] },
  { name: 'Backend & software systems', skills: [
    { name: 'Go', evidence: 'Demonstrated', evidenceIds: ['sprout', 'face-lock', 'flicknfit'] },
    { name: 'FastAPI', evidence: 'Demonstrated', evidenceIds: ['sprout', 'ppt-generator'] },
    { name: 'Firebase', evidence: 'Demonstrated', evidenceIds: ['e-wise', 'chat-app', 'step-up', 'face-lock', 'flicknfit', 'fitspace', 'stocarbon'] },
    { name: 'Database programming', evidence: 'Demonstrated', evidenceIds: ['lensa'] },
    { name: 'ERP customization', evidence: 'Demonstrated', evidenceIds: ['lensa'] },
    { name: 'React & TypeScript', evidence: 'Demonstrated', evidenceIds: ['ppt-generator'], evidenceNote: 'Portfolio and presentation-generator frontend' },
  ] },
];

export const defaultPortfolioContent: PortfolioContent = {
  personalInfo,
  projects,
  experiences,
  skillCategories,
};
