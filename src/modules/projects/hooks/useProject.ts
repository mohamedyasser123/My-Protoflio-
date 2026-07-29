import { useQuery } from '@tanstack/react-query';
import { getProjectById, projectKeys } from '../services/project.service';

export const useProject = (id: string | undefined) => {
  return useQuery({
    queryKey: projectKeys.detail(id!),
    queryFn: () => getProjectById(id!),
    enabled: !!id,
  });
};
