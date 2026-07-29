import { useQuery } from '@tanstack/react-query';
import { getProjects, projectKeys } from '../services/project.service';
import type { GetProjectsParams } from '../types/project.types';

export const useProjects = (params: GetProjectsParams) => {
  return useQuery({
    queryKey: projectKeys.list(params),
    queryFn: () => getProjects(params),
    staleTime: 5000,
  });
};
