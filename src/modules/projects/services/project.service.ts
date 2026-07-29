import { supabase } from '@/lib/supabase';
import type {
  Project,
  ProjectFormValues,
  GetProjectsParams,
  PaginatedResponse,
} from '../types/project.types';

// ─── Query Key Factory ────────────────────────────────────────────────────────

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (params: GetProjectsParams) => [...projectKeys.lists(), params] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

// ─── Helper: DB to CamelCase ──────────────────────────────────────────────────

const mapDbToProject = (dbProject: any): Project => ({
  id: dbProject.id,
  title: dbProject.title,
  slug: dbProject.slug,
  shortDescription: dbProject.short_description,
  longDescription: dbProject.long_description,
  technologies: dbProject.technologies,
  category: dbProject.category,
  githubUrl: dbProject.github_url,
  liveDemoUrl: dbProject.live_demo_url,
  videoUrl: dbProject.video_url,
  thumbnailUrl: dbProject.thumbnail_url,
  galleryUrls: dbProject.gallery_urls,
  featured: dbProject.featured,
  visible: dbProject.visible,
  status: dbProject.status,
  displayOrder: dbProject.display_order,
  projectDate: dbProject.project_date,
  githubRepoId: dbProject.github_repo_id,
  githubStars: dbProject.github_stars,
  githubForks: dbProject.github_forks,
  githubDeleted: dbProject.github_deleted,
  lastSyncTime: dbProject.last_sync_time,
  role: dbProject.role,
  challenges: dbProject.challenges,
  solutions: dbProject.solutions,
  createdAt: dbProject.created_at,
  updatedAt: dbProject.updated_at,
});

const mapProjectToDb = (payload: Partial<ProjectFormValues>) => ({
  ...(payload.title !== undefined && { title: payload.title }),
  ...(payload.slug !== undefined && { slug: payload.slug }),
  ...(payload.shortDescription !== undefined && { short_description: payload.shortDescription }),
  ...(payload.longDescription !== undefined && { long_description: payload.longDescription }),
  ...(payload.technologies !== undefined && { technologies: payload.technologies }),
  ...(payload.category !== undefined && { category: payload.category }),
  ...(payload.githubUrl !== undefined && { github_url: payload.githubUrl }),
  ...(payload.liveDemoUrl !== undefined && { live_demo_url: payload.liveDemoUrl }),
  ...(payload.videoUrl !== undefined && { video_url: payload.videoUrl }),
  ...(payload.thumbnailUrl !== undefined && { thumbnail_url: payload.thumbnailUrl }),
  ...(payload.galleryUrls !== undefined && { gallery_urls: payload.galleryUrls }),
  ...(payload.featured !== undefined && { featured: payload.featured }),
  ...(payload.visible !== undefined && { visible: payload.visible }),
  ...(payload.status !== undefined && { status: payload.status }),
  ...(payload.displayOrder !== undefined && { display_order: payload.displayOrder }),
  ...(payload.projectDate !== undefined && { project_date: payload.projectDate || null }),
  ...(payload.role !== undefined && { role: payload.role }),
  ...(payload.challenges !== undefined && { challenges: payload.challenges }),
  ...(payload.solutions !== undefined && { solutions: payload.solutions }),
});

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * Fetch a paginated, filtered, sorted list of projects (Admin Dashboard).
 */
export async function getProjects(params: GetProjectsParams = {}): Promise<PaginatedResponse<Project>> {
  let query = supabase.from('projects').select('*', { count: 'exact' });

  // Search filter
  if (params.search) {
    query = query.or(`title.ilike.%${params.search}%,short_description.ilike.%${params.search}%`);
  }

  // Sorting
  const field = params.sortField === 'displayOrder' ? 'display_order' 
              : params.sortField === 'createdAt' ? 'created_at' 
              : 'title';
  const ascending = params.sortDirection === 'asc';
  
  query = query.order(field, { ascending });

  // Pagination
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  query = query.range(start, end);

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return {
    data: data.map(mapDbToProject),
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

/**
 * Fetch all visible projects for the public portfolio.
 */
export async function getPublicProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('visible', true)
    .order('display_order', { ascending: true });

  if (error) throw new Error(error.message);
  return data.map(mapDbToProject);
}

/**
 * Fetch a single project by ID.
 */
export async function getProjectById(id: string): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return mapDbToProject(data);
}

/**
 * Create a new project.
 */
export async function createProject(payload: ProjectFormValues): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert([mapProjectToDb(payload)])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapDbToProject(data);
}

/**
 * Update an existing project.
 */
export async function updateProject(id: string, payload: Partial<ProjectFormValues>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update(mapProjectToDb(payload))
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapDbToProject(data);
}

/**
 * Delete a project.
 */
export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}

/**
 * Reorder projects (drag & drop).
 */
export async function reorderProjects(updates: { id: string; displayOrder: number }[]): Promise<void> {
  // Supabase doesn't have a bulk update RPC by default without custom SQL,
  // so we do Promise.all for simple small sets, or a custom RPC.
  // For < 50 items, Promise.all is perfectly fine.
  const promises = updates.map((update) =>
    supabase.from('projects').update({ display_order: update.displayOrder }).eq('id', update.id)
  );

  await Promise.all(promises);
}

/**
 * Toggle visibility of a project.
 */
export async function toggleProjectVisibility(id: string, visible: boolean): Promise<Project> {
  return updateProject(id, { visible });
}
