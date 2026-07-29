import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useProject } from '../hooks/useProject';
import { ProjectForm } from '../components/ProjectForm';
import { Skeleton } from '../../../components/admin/Skeleton';

const EditPageSkeleton: React.FC = () => (
  <div className="max-w-4xl mx-auto space-y-8">
    <Skeleton className="h-8 w-64" />
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  </div>
);

export const EditProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, isError } = useProject(id);

  if (isLoading) return <EditPageSkeleton />;

  if (isError || !project) {
    return <Navigate to="/admin/projects" replace />;
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Edit Project</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Editing: <span className="text-slate-300">{project.title}</span>
        </p>
      </div>
      <ProjectForm project={project} />
    </div>
  );
};

export default EditProjectPage;
