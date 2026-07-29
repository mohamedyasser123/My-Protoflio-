import React from 'react';
import { ConfirmDialog } from '../../../components/admin/ConfirmDialog';
import { useDeleteProject } from '../hooks/useDeleteProject';
import type { Project } from '../types/project.types';

interface DeleteConfirmDialogProps {
  project: Project | null;
  onClose: () => void;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  project,
  onClose,
}) => {
  const { mutate: deleteProject, isPending } = useDeleteProject();

  const handleConfirm = () => {
    if (!project) return;
    deleteProject(project.id, { onSuccess: onClose });
  };

  return (
    <ConfirmDialog
      isOpen={!!project}
      title="Delete Project"
      message={
        project
          ? `Are you sure you want to delete "${project.title}"? This action cannot be undone.`
          : ''
      }
      confirmLabel="Delete Project"
      cancelLabel="Keep It"
      variant="danger"
      isLoading={isPending}
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  );
};

export default DeleteConfirmDialog;
