import React from 'react';
import Skeleton from '../../../components/admin/Skeleton';

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
      <Skeleton className="h-48 w-full" rounded="sm" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16" rounded="full" />
          <Skeleton className="h-6 w-20" rounded="full" />
          <Skeleton className="h-6 w-14" rounded="full" />
        </div>
        <div className="flex justify-between pt-2">
          <Skeleton className="h-8 w-24" rounded="lg" />
          <Skeleton className="h-8 w-24" rounded="lg" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
