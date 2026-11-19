import { defaultPortfolioContent } from '../data/portfolioData';
import type { PortfolioContent } from '../data/portfolioData';

// The public CMS still has these earlier lists. Upgrade only exact matches so
// later edits made in the admin remain the source of truth.
const previousTechnologies: Record<string, string[][]> = {
  sprout: [['SwiftUI', 'SwiftData', 'Core ML', 'Foundation Models', 'Speech', 'AVFoundation', 'Go', 'FastAPI', 'Qdrant', 'Ollama', 'bge-m3', 'Docker']],
  foamy: [['SwiftUI', 'SwiftData', 'AVFoundation', 'Vision', 'URLSession', 'Combine', 'REST API', 'DeepSeek (server-side fallback)']],
  hichef: [['SwiftUI', 'SwiftData', 'Foundation Models', 'NaturalLanguage', 'Speech', 'AVFoundation']],
  muncakin: [['SwiftUI', 'Observation', 'Foundation']],
  'step-up': [['SwiftUI', 'ActivityKit', 'WidgetKit']],
  'ppt-generator': [['Python', 'FastAPI', 'LangChain', 'Hugging Face Embeddings', 'FAISS', 'SearXNG', 'Crawl4AI', 'Playwright', 'React', 'Vite', 'TypeScript', 'Server-Sent Events']],
  'document-formatting': [
    ['Python', 'Excel processing', 'LLM workflows'],
    ['Python', 'FastAPI', 'Excel processing', 'LLM workflows'],
  ],
  'face-lock': [['InsightFace', 'ArcFace', 'Python', 'Go', 'Gin', 'MySQL', 'Flutter', 'React']],
  flicknfit: [['Flutter', 'Dart', 'Go', 'Fiber', 'GORM', 'MySQL', 'Firebase']],
  fitspace: [['React', 'JavaScript', 'Flutter', 'Dart', 'Python', 'Flask', 'geopy', 'Firebase', 'Maps']],
  stocarbon: [['Flutter', 'Dart', 'Firebase Authentication', 'Google Sign-In', 'fl_chart']],
  'music-information-retrieval-ta': [['Python', 'PyTorch', 'librosa', 'Demucs', 'HPSS', 'MFCC', 'Chromagram', 'RNN', 'GRU', 'LSTM', 'BiLSTM', 'Transformer']],
  'e-wise': [
    ['Flutter', 'Dart', 'Firebase'],
    ['Flutter', 'Dart', 'Firebase Authentication', 'Cloud Firestore', 'FlutterMap', 'Geolocator'],
  ],
  'mabrur-hajj-umrah': [[]],
};

function isSameList(left: string[], right: string[]) {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}

export function mergeReviewedProjectUpdates(content: PortfolioContent): PortfolioContent {
  const reviewedById = new Map(defaultPortfolioContent.projects.map((project) => [project.id, project]));
  let changed = false;
  const projects = content.projects.map((project) => {
    const previous = previousTechnologies[project.id];
    const reviewed = reviewedById.get(project.id);
    if (!reviewed) return project;

    let updated = project;
    if (!Array.isArray(project.experienceIds) && reviewed.experienceIds?.length) {
      updated = { ...updated, experienceIds: reviewed.experienceIds };
    }
    if (previous?.some((list) => isSameList(project.technologies, list))) {
      updated = { ...updated, technologies: reviewed.technologies };
    }

    if (project.id === 'mabrur-hajj-umrah') {
      if (isSameList(project.platforms, ['Mobile'])) updated = { ...updated, platforms: reviewed.platforms };
      if (!project.architecture && reviewed.architecture) updated = { ...updated, architecture: reviewed.architecture };
      if (!project.links?.length && reviewed.links) updated = { ...updated, links: reviewed.links };
    }

    if (project.id === 'hichef' && !project.links?.length && reviewed.links?.length) {
      updated = { ...updated, links: reviewed.links };
    }

    if (updated !== project) changed = true;
    return updated;
  });

  return changed ? { ...content, projects } : content;
}
