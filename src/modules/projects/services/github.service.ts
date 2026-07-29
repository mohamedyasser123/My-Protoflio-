import { supabase } from '../../../lib/supabase';
import { generateSlug } from '../utils/project.utils';
import type { Project } from '../types/project.types';

const GITHUB_USERNAME = 'mohamedyasser123';

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  default_branch: string;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  homepage: string | null;
}

export const fetchGithubRepos = async (username: string): Promise<GithubRepo[]> => {
  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub repos: ${response.statusText}`);
  }
  return response.json();
};

export const syncGitHubRepositories = async (): Promise<{ newCount: number; updatedCount: number }> => {
  // 1. Fetch GitHub Repositories
  const repos = await fetchGithubRepos(GITHUB_USERNAME);
  
  // 2. Fetch all existing projects from Supabase to check for existing ones
  const { data: existingProjects, error } = await supabase
    .from('projects')
    .select('*')
    .not('github_repo_id', 'is', null);

  if (error) {
    throw new Error(`Failed to fetch existing projects: ${error.message}`);
  }

  let newCount = 0;
  let updatedCount = 0;
  
  const now = new Date().toISOString();
  
  // Map existing projects by github_repo_id for quick lookup
  const existingMap = new Map<number, any>();
  existingProjects.forEach(p => existingMap.set(p.github_repo_id, p));
  
  // Keep track of which repos were found on GitHub to mark the missing ones as deleted
  const foundRepoIds = new Set<number>();

  for (const repo of repos) {
    foundRepoIds.add(repo.id);
    const existing = existingMap.get(repo.id);

    if (existing) {
      // Update only the dynamic metrics (do not overwrite user content edits)
      const { error: updateError } = await supabase
        .from('projects')
        .update({
          github_stars: repo.stargazers_count,
          github_forks: repo.forks_count,
          github_deleted: false,
          last_sync_time: now,
        })
        .eq('id', existing.id);
        
      if (updateError) console.error('Failed to update repo stats:', updateError);
      else updatedCount++;
      
    } else {
      // Insert new repository as Draft
      const technologies = [];
      if (repo.language) technologies.push(repo.language);
      if (repo.topics && repo.topics.length > 0) {
        repo.topics.forEach(t => technologies.push(t));
      }

      // Deduplicate technologies
      const uniqueTech = [...new Set(technologies)];
      
      const { error: insertError } = await supabase
        .from('projects')
        .insert({
          title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
          slug: generateSlug(repo.name) + `-${repo.id}`,
          short_description: repo.description || `GitHub repository: ${repo.name}`,
          long_description: `<p>Imported from GitHub. <a href="${repo.html_url}" target="_blank">View Repository</a></p>`,
          technologies: uniqueTech,
          github_url: repo.html_url,
          live_demo_url: repo.homepage || '',
          github_repo_id: repo.id,
          github_stars: repo.stargazers_count,
          github_forks: repo.forks_count,
          github_deleted: false,
          last_sync_time: now,
          status: 'Draft',
          visible: true,
          category: 'Open Source',
        });
        
      if (insertError) console.error('Failed to insert new repo:', insertError);
      else newCount++;
    }
  }
  
  // Mark deleted repositories
  for (const [repoId, project] of existingMap.entries()) {
    if (!foundRepoIds.has(repoId) && !project.github_deleted) {
      const { error: deleteError } = await supabase
        .from('projects')
        .update({ github_deleted: true, last_sync_time: now })
        .eq('id', project.id);
        
      if (deleteError) console.error('Failed to mark repo as deleted:', deleteError);
      else updatedCount++;
    }
  }

  return { newCount, updatedCount };
};
