import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reorderProjects, projectKeys } from '../services/project.service';
import toast from 'react-hot-toast';
import type { Project } from '../types/project.types';

export const useProjectsSort = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: { id: string; displayOrder: number }[]) =>
      reorderProjects(updates),
    
    onMutate: async (updates) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: projectKeys.all });

      // Snapshot the previous value
      const previousData = queryClient.getQueriesData({ queryKey: projectKeys.all });

      // Optimistically update caches
      queryClient.setQueriesData(
        { queryKey: projectKeys.all },
        (old: any) => {
          if (!old?.data) return old;
          
          const newProjects = [...old.data];
          updates.forEach(update => {
            const index = newProjects.findIndex(p => p.id === update.id);
            if (index !== -1) {
              newProjects[index] = { ...newProjects[index], displayOrder: update.displayOrder };
            }
          });
          
          return {
            ...old,
            data: newProjects.sort((a, b) => a.displayOrder - b.displayOrder)
          };
        }
      );

      return { previousData };
    },
    
    onError: (err, newTodo, context) => {
      // Rollback
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      toast.error('Failed to reorder projects');
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
};
