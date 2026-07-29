import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Tag, Star, GitFork, Video } from 'lucide-react';
import { ensureAbsoluteUrl } from '../../modules/projects/utils/project.utils';

interface ProjectDialogProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    techStack: string[];
    github: string;
    liveDemo: string;
    galleryUrls?: string[];
    githubStars?: number;
    githubForks?: number;
    longDescription?: string;
    role?: string;
    videoUrl?: string;
  } | null;
  onClose: () => void;
}

export const ProjectDialog: React.FC<ProjectDialogProps> = ({ project, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setActiveImg(0);
  }, [project?.id]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!project) return;
      const images = getImages();
      if (e.key === 'ArrowRight') setActiveImg((p) => (p + 1) % images.length);
      if (e.key === 'ArrowLeft') setActiveImg((p) => (p - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [project, onClose]);

  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  const getImages = () => {
    if (!project) return [];
    const imgs = [project.image, ...(project.galleryUrls || [])].filter(Boolean);
    return imgs.length ? imgs : [project.image];
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-dark-card border border-dark-border rounded-2xl shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-dark-bg/80 border border-dark-border flex items-center justify-center text-dark-muted hover:text-white hover:bg-dark-bg transition-all"
            >
              <X size={18} />
            </button>

            {/* Image Viewer */}
            {(() => {
              const images = getImages();
              return (
                <div className="relative h-56 sm:h-72 bg-dark-bg overflow-hidden rounded-t-2xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImg}
                      src={images[activeImg]}
                      alt={project.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />

                  {/* Navigation arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImg((p) => (p - 1 + images.length) % images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all backdrop-blur-sm"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setActiveImg((p) => (p + 1) % images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all backdrop-blur-sm"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Image dots */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className={`w-2 h-2 rounded-full transition-all ${i === activeImg ? 'bg-white w-5' : 'bg-white/40'}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Thumbnail strip */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 right-3 flex gap-1.5">
                      {images.slice(0, 4).map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? 'border-primary-light' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Title + GitHub stats */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                  {project.role && (
                    <p className="text-sm text-primary-light mt-0.5">{project.role}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {(project.githubStars !== undefined && project.githubStars > 0) && (
                    <span className="flex items-center gap-1 text-sm text-amber-400">
                      <Star size={14} fill="currentColor" />
                      {project.githubStars}
                    </span>
                  )}
                  {(project.githubForks !== undefined && project.githubForks > 0) && (
                    <span className="flex items-center gap-1 text-sm text-dark-muted">
                      <GitFork size={14} />
                      {project.githubForks}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-dark-muted leading-relaxed">{project.description}</p>

              {/* Long description */}
              {project.longDescription && (
                <div
                  className="prose prose-invert prose-sm max-w-none text-dark-muted leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: project.longDescription }}
                />
              )}

              {/* Technologies */}
              {project.techStack?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-dark-muted uppercase tracking-wider mb-3">
                    <Tag size={12} />
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2 border-t border-dark-border">
                {project.github && project.github !== '#' && (
                  <a
                    href={ensureAbsoluteUrl(project.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary flex items-center gap-2 py-2 px-5 text-sm"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                )}
              {project.liveDemo && project.liveDemo !== '#' && (
                  <a
                    href={ensureAbsoluteUrl(project.liveDemo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary flex items-center gap-2 py-2 px-5 text-sm"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {project.videoUrl && project.videoUrl !== '#' && (
                  <a
                    href={ensureAbsoluteUrl(project.videoUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary flex items-center gap-2 py-2 px-5 text-sm"
                  >
                    <Video size={16} />
                    Watch Video
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
