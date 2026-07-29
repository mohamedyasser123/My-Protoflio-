import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject, projectKeys } from '../services/project.service';
import toast from 'react-hot-toast';

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success('Project created successfully');
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
    onError: (error: Error) => {
      toast.error(`Failed to create project: ${error.message}`);
    },
  });
};
