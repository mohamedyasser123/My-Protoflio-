import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject, projectKeys } from '../services/project.service';
import toast from 'react-hot-toast';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success('Project deleted successfully');
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete project: ${error.message}`);
    },
  });
};
