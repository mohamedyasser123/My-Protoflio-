import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Loader2, Send } from 'lucide-react';
import { projectSchema, type ProjectSchemaType } from '../schemas/project.schema';
import type { Project, ProjectFormValues } from '../types/project.types';
import { useCreateProject } from '../hooks/useCreateProject';
import { useUpdateProject } from '../hooks/useUpdateProject';
import { ProjectFormFields } from './ProjectFormFields';

interface ProjectFormProps {
  project?: Project; // if provided → edit mode
}

const DEFAULT_VALUES: ProjectSchemaType = {
  title: '',
  slug: '',
  shortDescription: '',
  longDescription: '',
  technologies: [],
  category: 'Web App',
  githubUrl: '',
  liveDemoUrl: '',
  videoUrl: '',
  thumbnailUrl: '',
  galleryUrls: [],
  featured: false,
  visible: true,
  displayOrder: 0,
  projectDate: '',
  role: '',
  challenges: '',
  solutions: '',
};

export const ProjectForm: React.FC<ProjectFormProps> = ({ project }) => {
  const navigate = useNavigate();
  const isEditing = !!project;

  const { mutateAsync: createProject, isPending: isCreating } = useCreateProject();
  const { mutateAsync: updateProject, isPending: isUpdating } = useUpdateProject();

  const isPending = isCreating || isUpdating;

  const methods = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema) as any,
    defaultValues: project
      ? {
          title: project.title,
          slug: project.slug,
          shortDescription: project.shortDescription ?? '',
          longDescription: project.longDescription ?? '',
          technologies: project.technologies ?? [],
          category: project.category ?? 'Web App',
          githubUrl: project.githubUrl ?? '',
          liveDemoUrl: project.liveDemoUrl ?? '',
          videoUrl: project.videoUrl ?? '',
          thumbnailUrl: project.thumbnailUrl ?? '',
          galleryUrls: project.galleryUrls ?? [],
          featured: project.featured ?? false,
          visible: project.visible ?? true,
          status: project.status ?? 'Draft',
          displayOrder: project.displayOrder ?? 0,
          projectDate: project.projectDate ?? '',
          role: project.role ?? '',
          challenges: project.challenges ?? '',
          solutions: project.solutions ?? '',
        }
      : DEFAULT_VALUES,
  });

  const handleSubmit = async (data: ProjectSchemaType, saveAsHidden = false) => {
    const payload = saveAsHidden ? { ...data, visible: false } : data;

    if (isEditing && project) {
      await updateProject({ id: project.id, payload: payload as ProjectFormValues });
    } else {
      await createProject(payload as ProjectFormValues);
    }
    navigate('/dashboard-admin-xyz');
  };

  const onSubmit = methods.handleSubmit((data) => handleSubmit(data as unknown as ProjectSchemaType));
  const onSaveDraft = methods.handleSubmit((data) => handleSubmit(data as unknown as ProjectSchemaType, true));

  const hasErrors = Object.keys(methods.formState.errors).length > 0;

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} noValidate className="max-w-4xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-center gap-3 flex-wrap">
            {hasErrors && (
              <p className="text-xs text-red-400 hidden sm:block">
                Please fix the errors below
              </p>
            )}

            {/* Save as draft */}
            {!isEditing && (
              <button
                type="button"
                onClick={onSaveDraft}
                disabled={isPending}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all disabled:opacity-50"
              >
                <Save size={15} />
                Save as Hidden
              </button>
            )}

            {/* Publish / Update */}
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-900/30 transition-all disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            >
              {isPending ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  {isEditing ? 'Saving…' : 'Publishing…'}
                </>
              ) : (
                <>
                  <Send size={15} />
                  {isEditing ? 'Save Changes' : 'Publish Project'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Form sections */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
          <ProjectFormFields />
        </div>

        {/* Bottom actions */}
        <div className="flex justify-end gap-3 mt-6">
          {!isEditing && (
            <button
              type="button"
              onClick={onSaveDraft}
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all disabled:opacity-50"
            >
              <Save size={15} />
              Save as Hidden
            </button>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-900/30 transition-all disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                {isEditing ? 'Saving…' : 'Publishing…'}
              </>
            ) : (
              <>
                <Send size={15} />
                {isEditing ? 'Save Changes' : 'Publish Project'}
              </>
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProjectForm;
