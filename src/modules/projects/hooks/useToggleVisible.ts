import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleProjectVisibility, projectKeys } from '../services/project.service';
import toast from 'react-hot-toast';

export const useToggleVisible = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, visible }: { id: string; visible: boolean }) =>
      toggleProjectVisibility(id, visible),
    onSuccess: (updatedProject) => {
      toast.success(`Project ${updatedProject.visible ? 'is now visible' : 'is now hidden'}`);
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
    onError: (error: Error) => {
      toast.error(`Failed to update visibility: ${error.message}`);
    },
  });
};
