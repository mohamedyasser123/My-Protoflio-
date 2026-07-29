import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  Pencil,
  Trash2,
  Copy,
  Star,
  GripVertical,
  MoreHorizontal,
  Github,
  AlertTriangle,
  EyeOff
} from 'lucide-react';
import type { Project } from '../types/project.types';
import { Badge } from '../../../components/admin/Badge';
import { CATEGORY_COLORS } from '../constants/project.constants';
import { useUpdateProject } from '../hooks/useUpdateProject';
import { useDuplicateProject } from '../hooks/useDuplicateProject';
import { useToggleVisible } from '../hooks/useToggleVisible';
import { truncate } from '../utils/project.utils';

interface ProjectTableRowProps {
  project: Project;
  dragHandleProps?: Record<string, unknown>;
  onView: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export const ProjectTableRow: React.FC<ProjectTableRowProps> = ({
  project,
  dragHandleProps,
  onView,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { mutate: updateProject, isPending: isToggling } = useUpdateProject();
  const { mutate: duplicate, isPending: isDuplicating } = useDuplicateProject();
  const { mutate: toggleVisible, isPending: isTogglingVis } = useToggleVisible();

  const handleToggleFeatured = () => {
    updateProject({ id: project.id, payload: { featured: !project.featured } });
  };
  
  const handleToggleVisibility = () => {
    toggleVisible({ id: project.id, visible: !project.visible });
  };

  const handleDuplicate = () => {
    duplicate(project);
    setMenuOpen(false);
  };

  const categoryColor = (CATEGORY_COLORS[project.category] ?? 'slate') as any;

  return (
    <div className={`group flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-800 bg-slate-900 transition-all ${project.visible ? 'hover:border-slate-700 hover:bg-slate-800/50' : 'opacity-70 hover:opacity-100 grayscale-[0.2]'}`}>
      {/* Drag handle */}
      <span
        className="shrink-0 cursor-grab text-slate-700 group-hover:text-slate-500 transition-colors"
        {...dragHandleProps}
        title="Drag to reorder"
      >
        <GripVertical size={16} />
      </span>

      {/* Thumbnail */}
      <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
            No img
          </div>
        )}
      </div>

      {/* Title + description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-medium text-white truncate max-w-[200px] sm:max-w-xs">
            {project.title}
          </p>
          {project.featured && (
            <span title="Featured">
              <Star size={13} className="text-amber-400 fill-amber-400" />
            </span>
          )}
          {project.githubRepoId && (
            <span title="Imported from GitHub">
              <Github size={13} className="text-slate-400" />
            </span>
          )}
          {project.githubDeleted && (
            <span title="Repository Deleted on GitHub">
              <AlertTriangle size={13} className="text-red-400" />
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 truncate max-w-xs hidden sm:block">
          {truncate(project.shortDescription, 60)}
        </p>
      </div>

      {/* Category */}
      <div className="hidden md:block shrink-0">
        <Badge label={project.category} variant={categoryColor} />
      </div>

      {/* Visibility Status */}
      <div className="hidden sm:flex flex-col gap-1 shrink-0 items-end">
        <Badge 
          label={project.visible ? 'Visible' : 'Hidden'} 
          variant={project.visible ? 'emerald' : 'slate'} 
          dot 
        />
        <Badge 
          label={project.status} 
          variant={project.status === 'Published' ? 'sky' : 'orange'} 
        />
      </div>

      {/* Order */}
      <div className="hidden lg:block shrink-0 w-8 text-center text-xs text-slate-600 font-mono">
        {project.displayOrder}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Toggle Featured */}
        <button
          onClick={handleToggleFeatured}
          disabled={isToggling}
          title={project.featured ? 'Unfeature' : 'Feature'}
          className={`p-1.5 rounded-lg transition-colors ${
            project.featured
              ? 'text-amber-400 hover:bg-amber-400/10'
              : 'text-slate-600 hover:text-amber-400 hover:bg-amber-400/10'
          } disabled:opacity-40`}
        >
          <Star size={15} fill={project.featured ? 'currentColor' : 'none'} />
        </button>

        {/* View */}
        <button
          onClick={() => onView(project)}
          title="View details"
          className="p-1.5 rounded-lg text-slate-500 hover:text-sky-400 hover:bg-sky-500/10 transition-colors"
        >
          <Eye size={15} />
        </button>

        {/* Edit */}
        <Link
          to={`/dashboard-admin-xyz/projects/${project.id}/edit`}
          title="Edit"
          className="p-1.5 rounded-lg text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 transition-colors"
        >
          <Pencil size={15} />
        </Link>

        {/* More menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-colors"
            title="More actions"
          >
            <MoreHorizontal size={15} />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-8 z-20 w-44 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 overflow-hidden">
                
                <button
                  onClick={() => { handleToggleVisibility(); setMenuOpen(false); }}
                  disabled={isTogglingVis}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50"
                >
                  {project.visible ? <EyeOff size={14} /> : <Eye size={14} />}
                  {project.visible ? 'Hide Project' : 'Show Project'}
                </button>

                <button
                  onClick={handleDuplicate}
                  disabled={isDuplicating}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50"
                >
                  <Copy size={14} />
                  Duplicate
                </button>
                
                <div className="h-px bg-slate-800 my-1" />
                
                <button
                  onClick={() => {
                    onDelete(project);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
