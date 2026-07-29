import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProject, projectKeys } from '../services/project.service';
import type { ProjectFormValues } from '../types/project.types';
import toast from 'react-hot-toast';

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<ProjectFormValues> }) =>
      updateProject(id, payload),
    onSuccess: (_, { id }) => {
      toast.success('Project updated successfully');
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(id) });
    },
    onError: (error: Error) => {
      toast.error(`Failed to update project: ${error.message}`);
    },
  });
};
