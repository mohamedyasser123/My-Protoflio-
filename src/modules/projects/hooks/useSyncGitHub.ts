import { useMutation, useQueryClient } from '@tanstack/react-query';
import { syncGitHubRepositories } from '../services/github.service';
import { projectKeys } from '../services/project.service';
import toast from 'react-hot-toast';

export const useSyncGitHub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: syncGitHubRepositories,
    onSuccess: ({ newCount, updatedCount }) => {
      toast.success(`Synced! ${newCount} new, ${updatedCount} updated.`);
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
    onError: (error: Error) => {
      toast.error(`Sync failed: ${error.message}`);
    },
  });
};
