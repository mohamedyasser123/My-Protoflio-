import React, { useEffect } from 'react';
import { X, ExternalLink, Star, Calendar, Tag, Eye, EyeOff, Video } from 'lucide-react';
import { GithubIcon } from '../../../components/ui/Icons';
import type { Project } from '../types/project.types';
import { Badge } from '../../../components/admin/Badge';
import { CATEGORY_COLORS } from '../constants/project.constants';
import { formatDate } from '../utils/project.utils';

interface ProjectViewDialogProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectViewDialog: React.FC<ProjectViewDialogProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!project) return null;

  const categoryColor = CATEGORY_COLORS[project.category] as any ?? 'slate';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl animate-fade-in">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X size={16} />
        </button>

        {/* Thumbnail */}
        {project.thumbnailUrl && (
          <div className="relative h-52 overflow-hidden rounded-t-2xl">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            {project.featured && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-medium">
                <Star size={12} fill="currentColor" />
                Featured
              </div>
            )}
          </div>
        )}

        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge 
                label={project.visible ? 'Visible' : 'Hidden'} 
                variant={project.visible ? 'emerald' : 'slate'} 
                dot 
                icon={project.visible ? <Eye size={12} /> : <EyeOff size={12} />}
              />
              <Badge label={project.category} variant={categoryColor} />
              {project.role && (
                <Badge label={project.role} variant="slate" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{project.title}</h2>
            {project.slug && (
              <p className="text-xs text-slate-500 font-mono">/{project.slug}</p>
            )}
            <p className="text-slate-400 mt-2 leading-relaxed">{project.shortDescription}</p>
          </div>

          {/* Dates & GitHub Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            {project.projectDate && (
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{formatDate(project.projectDate)}</span>
              </div>
            )}
            {project.githubRepoId && (
              <>
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-amber-400" />
                  <span>{project.githubStars} Stars</span>
                </div>
                <div className="flex items-center gap-2">
                  <GithubIcon size={14} className="text-slate-400" />
                  <span>{project.githubForks} Forks</span>
                </div>
              </>
            )}
          </div>

          {/* Technologies */}
          {project.technologies.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                <Tag size={12} />
                Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-sky-500/10 text-sky-300 border border-sky-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Long Description */}
          {project.longDescription && (
            <div>
              <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Description</h4>
              <div
                className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.longDescription }}
              />
            </div>
          )}

          {/* Challenges & Solutions */}
          {(project.challenges || project.solutions) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.challenges && (
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <h4 className="text-xs font-medium text-red-400 uppercase tracking-wider mb-2">Challenges</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{project.challenges}</p>
                </div>
              )}
              {project.solutions && (
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <h4 className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-2">Solutions</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{project.solutions}</p>
                </div>
              )}
            </div>
          )}

          {/* Links */}
          {(project.githubUrl || project.liveDemoUrl || project.videoUrl) && (
            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium text-white transition-colors"
                >
                  <GithubIcon size={16} />
                  View Source
                </a>
              )}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sm font-medium text-sky-400 transition-colors"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium text-white transition-colors"
                >
                  <Video size={16} />
                  Watch Video
                </a>
              )}
            </div>
          )}

          {/* Gallery */}
          {project.galleryUrls && project.galleryUrls.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 mt-6">Gallery</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.galleryUrls.map((url, i) => (
                  <div key={i} className="aspect-video rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
                    <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
