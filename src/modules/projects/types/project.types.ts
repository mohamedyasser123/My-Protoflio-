// ─── Core Project Entity ──────────────────────────────────────────────────────

export type ProjectCategory =
  | 'Web App'
  | 'Mobile App'
  | 'Full Stack'
  | 'API / Backend'
  | 'DevOps / Tools'
  | 'Open Source'
  | 'Other';

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveDemoUrl?: string;
  videoUrl?: string;
  thumbnailUrl: string;
  galleryUrls: string[];
  featured: boolean;
  visible: boolean;
  status: 'Draft' | 'Published';
  displayOrder: number;
  projectDate?: string;
  githubRepoId?: number | null;
  githubStars: number;
  githubForks: number;
  githubDeleted: boolean;
  lastSyncTime?: string | null;
  role?: string;
  challenges?: string;
  solutions?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Form Types ───────────────────────────────────────────────────────────────

export type ProjectFormValues = Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'githubRepoId' | 'githubStars' | 'githubForks' | 'githubDeleted' | 'lastSyncTime'>;

// ─── Query Params ─────────────────────────────────────────────────────────────

export type SortField = 'displayOrder' | 'title' | 'createdAt';
export type SortDirection = 'asc' | 'desc';

export interface GetProjectsParams {
  page?: number;
  limit?: number;
  search?: string;
  sortField?: SortField;
  sortDirection?: SortDirection;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
