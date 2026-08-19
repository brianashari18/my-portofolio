import roleDiceAppImg from '../assets/images/projects/role-dice-app.png';
import quizAppImg from '../assets/images/projects/quiz-app.png';
import expenseTrackerImg from '../assets/images/projects/expense-tracker-app.png';
import mealsAppImg from '../assets/images/projects/meals-app.png';
import chatAppImg from '../assets/images/projects/chat-app.png';
import eWiseImg from '../assets/images/projects/e-waste-app.png';
import profileImg from '../assets/images/about/profile.jpg';

export interface Project {
  id: string;
  name: string;
  category: 'Flutter / Mobile' | 'Fullstack & Web' | 'UI/UX & AI';
  description: string;
  detailedDescription?: string;
  link: string;
  githubUrl?: string;
  image: string;
  technologies: string[];
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: { name: string; level: string; icon?: string }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  description: string;
  highlights: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  detailedBio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  profileImage: string;
  stats: { label: string; value: string }[];
}

export const personalInfo: PersonalInfo = {
  name: "Brian Anashari",
  title: "Mobile App & Software Developer",
  subtitle: "Crafting beautiful, user-centered mobile applications & web solutions powered by Flutter & Modern Web Tech.",
  bio: "5th-semester Computer Science/IT student with a strong passion for mobile development, software engineering, and AI technologies.",
  detailedBio: "I am a dedicated student deeply interested in software engineering, mobile application architecture, and AI integration. Active in student organizations with a strong emphasis on planning and execution, I thrive on solving complex problems, adopting new frameworks, and delivering sleek, reliable user experiences.",
  location: "Indonesia",
  email: "brianashari18@gmail.com",
  github: "https://github.com/brianashari18",
  linkedin: "https://www.linkedin.com/in/brian-anashari-099744151/",
  profileImage: profileImg,
  stats: [
    { label: "Completed Apps", value: "6+" },
    { label: "Core Framework", value: "Flutter" },
    { label: "Semester", value: "5th Term" },
    { label: "Passion", value: "Mobile & AI" },
  ],
};

export const projects: Project[] = [
  {
    id: 'e-waste-app',
    name: 'E-Wise (E-Waste Management App)',
    category: 'Flutter / Mobile',
    description: 'Promoting responsible e-waste disposal and recycling with real-time tracking.',
    detailedDescription: 'E-Wise is an eco-centric mobile application designed to simplify electronic waste collection, rewards, and environmental awareness. Features Firebase authentication, interactive maps, and real-time status updates.',
    link: '/projects#e-waste-app',
    githubUrl: 'https://github.com/brianashari18',
    image: eWiseImg,
    technologies: ['Flutter', 'Dart', 'Firebase', 'State Management', 'Cloud Firestore'],
    featured: true,
  },
  {
    id: 'chat-app',
    name: 'Realtime Chat Application',
    category: 'Flutter / Mobile',
    description: 'Seamless communication app powered by Flutter & Firebase Realtime database.',
    detailedDescription: 'Instant messaging app with user authentication, live chat feeds, image sharing, and push notification triggers built with Flutter & Firebase backend.',
    link: '/projects#chat-app',
    githubUrl: 'https://github.com/brianashari18',
    image: chatAppImg,
    technologies: ['Flutter', 'Firebase Auth', 'Firestore', 'Push Notifications'],
    featured: true,
  },
  {
    id: 'expense-tracker-app',
    name: 'Expense Tracker App',
    category: 'Flutter / Mobile',
    description: 'Intuitive daily expense manager with visual budget analytics and charts.',
    detailedDescription: 'Allows users to log expenses by category, view spending breakdowns in dynamic charts, and set monthly budget limits effortlessly.',
    link: '/projects#expense-tracker-app',
    githubUrl: 'https://github.com/brianashari18',
    image: expenseTrackerImg,
    technologies: ['Flutter', 'Dart', 'Charts API', 'Local Storage'],
    featured: true,
  },
  {
    id: 'meals-app',
    name: 'Recipe & Meal Planner App',
    category: 'Flutter / Mobile',
    description: 'Discover culinary recipes, filter dietary needs, and curate personal favorites.',
    detailedDescription: 'A multi-screen app that presents culinary recipes categorized by region and diet (Gluten-Free, Vegan, Vegetarian). Features dynamic filtering and interactive favorite bookmarks.',
    link: '/projects#meals-app',
    githubUrl: 'https://github.com/brianashari18',
    image: mealsAppImg,
    technologies: ['Flutter', 'State Management', 'REST API / Data Models'],
    featured: false,
  },
  {
    id: 'quiz-app',
    name: 'Interactive Quiz App',
    category: 'Flutter / Mobile',
    description: 'Engaging trivia and knowledge assessment app with instant scoring summaries.',
    detailedDescription: 'Dynamic multiple-choice quiz experience with smooth state progression, custom timer triggers, and comprehensive answer review screens.',
    link: '/projects#quiz-app',
    githubUrl: 'https://github.com/brianashari18',
    image: quizAppImg,
    technologies: ['Flutter', 'Dart UI', 'Stateful Widgets'],
    featured: false,
  },
  {
    id: 'role-dice-app',
    name: 'Role Dice App',
    category: 'Flutter / Mobile',
    description: 'Simulating dice rolls for tabletop role-playing games with fluid animations.',
    detailedDescription: 'A sleek dice simulator featuring custom animations, random generator algorithms, and multi-dice configuration for gaming sessions.',
    link: '/projects#role-dice-app',
    githubUrl: 'https://github.com/brianashari18',
    image: roleDiceAppImg,
    technologies: ['Flutter', 'Animation Controller', 'Dart'],
    featured: false,
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Mobile Development',
    description: 'Crafting responsive, cross-platform mobile apps for iOS & Android.',
    iconName: 'Smartphone',
    skills: [
      { name: 'Flutter', level: 'Advanced' },
      { name: 'Dart', level: 'Advanced' },
      { name: 'State Management (Provider/Riverpod)', level: 'Intermediate' },
      { name: 'Mobile UI/UX Design', level: 'Advanced' },
    ],
  },
  {
    title: 'Backend & Cloud Services',
    description: 'Integrating secure cloud databases and authentication systems.',
    iconName: 'Server',
    skills: [
      { name: 'Firebase Auth & Firestore', level: 'Intermediate' },
      { name: 'RESTful APIs', level: 'Intermediate' },
      { name: 'Database Management', level: 'Intermediate' },
    ],
  },
  {
    title: 'Frontend & Web Tech',
    description: 'Building modern responsive web interfaces and dashboards.',
    iconName: 'Code',
    skills: [
      { name: 'React.js', level: 'Intermediate' },
      { name: 'TypeScript', level: 'Intermediate' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'HTML5 & CSS3', level: 'Advanced' },
    ],
  },
  {
    title: 'Tools & Workflows',
    description: 'Standard version control, CI/CD, and agile team collaboration tools.',
    iconName: 'Wrench',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced' },
      { name: 'VS Code & Android Studio', level: 'Advanced' },
      { name: 'Figma', level: 'Intermediate' },
    ],
  },
];

export const experiences: ExperienceItem[] = [
  {
    period: '2022 - Present',
    role: 'Computer Science Student',
    organization: 'University Studies (5th Semester)',
    description: 'Focusing on software development, mobile application architecture, object-oriented programming, data structures, and AI algorithms.',
    highlights: [
      'Built 6+ full-featured Flutter applications with Firebase backends.',
      'Active contributor to student organizations and project planning teams.',
      'Continuous learning in web development (React + TypeScript) and AI technology.',
    ],
  },
  {
    period: '2023 - Present',
    role: 'Organization Lead & Event Planner',
    organization: 'Student Organization',
    description: 'Planning, organizing, and executing student development initiatives, workshops, and tech seminars.',
    highlights: [
      'Led event logistics and coordination for university gatherings.',
      'Fostered collaborative team environments and effective cross-member communication.',
    ],
  },
];
