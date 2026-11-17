import { defaultPortfolioContent } from '../data/portfolioData';
import type { PortfolioContent } from '../data/portfolioData';

// The public CMS still has these earlier lists. Upgrade only an exact match so
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
};

function isSameList(left: string[], right: string[]) {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}

export function mergeReviewedTechnologies(content: PortfolioContent): PortfolioContent {
  const reviewedById = new Map(defaultPortfolioContent.projects.map((project) => [project.id, project.technologies]));
  let changed = false;
  const projects = content.projects.map((project) => {
    const previous = previousTechnologies[project.id];
    const reviewed = reviewedById.get(project.id);
    if (!previous || !reviewed || !previous.some((list) => isSameList(project.technologies, list))) return project;
    changed = true;
    return { ...project, technologies: reviewed };
  });

  return changed ? { ...content, projects } : content;
}
