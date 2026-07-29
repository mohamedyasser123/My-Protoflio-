import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject, projectKeys } from '../services/project.service';
import type { Project } from '../types/project.types';
import toast from 'react-hot-toast';

export const useDuplicateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: Project) => {
      const { id, createdAt, updatedAt, ...rest } = project;
      return createProject({
        ...rest,
        title: `${rest.title} (Copy)`,
        slug: `${rest.slug}-copy-${Date.now()}`,
      });
    },
    onSuccess: () => {
      toast.success('Project duplicated successfully');
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
    onError: (error: Error) => {
      toast.error(`Failed to duplicate project: ${error.message}`);
    },
  });
};
