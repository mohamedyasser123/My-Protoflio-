import type { ProjectCategory, SortField } from '../types/project.types';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Web App',
  'Mobile App',
  'Full Stack',
  'API / Backend',
  'DevOps / Tools',
  'Open Source',
  'Other',
];

export const TECHNOLOGY_SUGGESTIONS: string[] = [
  'React', 'React Native', 'Next.js', 'Vue.js', 'Nuxt.js', 'Angular',
  'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'SASS',
  'Node.js', 'Express', 'NestJS', 'Fastify', 'Django', 'FastAPI',
  'Python', 'Java', 'Go', 'Rust', 'C++', 'C#', '.NET',
  'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Firebase',
  'GraphQL', 'REST API', 'WebSockets', 'Socket.io',
  'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Vercel', 'Netlify',
  'Redux', 'Zustand', 'MobX', 'Recoil',
  'Flutter', 'Dart', 'Swift', 'Kotlin',
  'Three.js', 'D3.js', 'Chart.js', 'Framer Motion',
  'Jest', 'Vitest', 'Cypress', 'Playwright',
];

export const PROJECTS_PER_PAGE = 10;

export const DEFAULT_SORT_FIELD: SortField = 'displayOrder';
export const DEFAULT_SORT_DIRECTION = 'asc' as const;


export const CATEGORY_COLORS: Record<string, string> = {
  'Web App': 'violet',
  'Mobile App': 'pink',
  'Full Stack': 'orange',
  'API / Backend': 'cyan',
  'DevOps / Tools': 'yellow',
  'Open Source': 'green',
  Other: 'slate',
};

export const MAX_THUMBNAIL_SIZE_MB = 5;
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_IMAGES_COUNT = 10;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
