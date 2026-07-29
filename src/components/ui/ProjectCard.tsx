import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Expand } from 'lucide-react';
import { GithubIcon } from './Icons';
import { ensureAbsoluteUrl } from '../../modules/projects/utils/project.utils';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    techStack: string[];
    github: string;
    liveDemo: string;
  };
  index: number;
  onClick?: () => void;
}

const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card group flex flex-col h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <div className="absolute inset-0 bg-dark-bg/20 group-hover:bg-black/30 transition-colors duration-300 z-10" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1e293b/94a3b8?text=No+Image';
          }}
        />
        {/* Expand hint */}
        <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
          <Expand size={14} />
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-dark-text mb-2 group-hover:text-primary-light transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-dark-muted mb-4 flex-grow line-clamp-3">
          {project.description || 'Click to view project details.'}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary-light rounded-full border border-primary/20"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-3 py-1 text-xs font-medium bg-dark-bg text-dark-muted rounded-full border border-dark-border">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-dark-border/50" onClick={(e) => e.stopPropagation()}>
          {project.github && project.github !== '#' && (
            <a
              href={ensureAbsoluteUrl(project.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-dark-muted hover:text-white transition-colors duration-300"
            >
              <GithubIcon size={18} className="shrink-0" />
              <span>Code</span>
            </a>
          )}
          {project.liveDemo && project.liveDemo !== '#' && (
            <a
              href={ensureAbsoluteUrl(project.liveDemo)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary-light hover:text-white transition-colors duration-300 ml-auto"
            >
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
