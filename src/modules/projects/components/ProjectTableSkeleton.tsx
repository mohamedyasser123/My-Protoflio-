import Skeleton from '../../../components/admin/Skeleton';

export const ProjectTableSkeleton: React.FC = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800"
        >
          <Skeleton className="w-10 h-10" rounded="lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-64" />
          </div>
          <Skeleton className="h-6 w-20 hidden sm:block" rounded="full" />
          <Skeleton className="h-6 w-24 hidden md:block" rounded="full" />
          <div className="flex gap-2 ml-auto">
            <Skeleton className="w-8 h-8" rounded="lg" />
            <Skeleton className="w-8 h-8" rounded="lg" />
            <Skeleton className="w-8 h-8" rounded="lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectTableSkeleton;
