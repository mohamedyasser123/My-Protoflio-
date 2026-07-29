import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getPublicProjects, projectKeys } from '../../modules/projects/services/project.service';
import ProjectCard from '../ui/ProjectCard';
import { ProjectCardSkeleton } from '../../modules/projects/components/ProjectCardSkeleton';
import { ProjectDialog } from '../ui/ProjectDialog';
import type { Project } from '../../modules/projects/types/project.types';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: apiProjects, isLoading } = useQuery({
    queryKey: [...projectKeys.all, 'public'],
    queryFn: getPublicProjects,
    retry: 1,
    staleTime: 1000 * 60 * 2,
  });

  const projects = (apiProjects ?? [])
    .filter((p) => p.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const cardProjects = projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.shortDescription,
    image: p.thumbnailUrl,
    techStack: p.technologies,
    github: p.githubUrl || '#',
    liveDemo: p.liveDemoUrl || '#',
    galleryUrls: p.galleryUrls,
    githubStars: p.githubStars,
    githubForks: p.githubForks,
    longDescription: p.longDescription,
    role: p.role || '',
  }));

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-text">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light">Projects</span>
          </h2>
          <p className="text-dark-muted max-w-2xl mx-auto">
            A selection of some of my recent work. Ranging from complex web applications to sleek mobile platforms.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
            {cardProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(projects.find(p => p.id === project.id) ?? null)}
              />
            ))}
          </div>
        )}

        {cardProjects.length === 0 && !isLoading && (
          <p className="text-center text-dark-muted py-12">No featured projects yet.</p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/mohamedyasser123"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary inline-flex"
          >
            View More on GitHub
          </a>
        </motion.div>
      </div>

      {/* Project Detail Dialog */}
      <ProjectDialog
        project={selectedProject ? {
          id: selectedProject.id,
          title: selectedProject.title,
          description: selectedProject.shortDescription,
          image: selectedProject.thumbnailUrl,
          techStack: selectedProject.technologies,
          github: selectedProject.githubUrl || '#',
          liveDemo: selectedProject.liveDemoUrl || '#',
          galleryUrls: selectedProject.galleryUrls,
          githubStars: selectedProject.githubStars,
          githubForks: selectedProject.githubForks,
          longDescription: selectedProject.longDescription,
          role: selectedProject.role || '',
          videoUrl: selectedProject.videoUrl || '',
        } : null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
