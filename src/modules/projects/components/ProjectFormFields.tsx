import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import type { ProjectSchemaType } from '../schemas/project.schema';
import { PROJECT_CATEGORIES } from '../constants/project.constants';
import { generateSlug } from '../utils/project.utils';
import { ImageUploader } from './ImageUploader';
import { TechTagsInput } from './TechTagsInput';
import { RichTextEditor } from './RichTextEditor';

// ─── Shared field wrapper ─────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, name, error, required, hint, children }) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-sm font-medium text-slate-300">
      {label}
      {required && <span className="ml-1 text-red-400">*</span>}
    </label>
    {children}
    {hint && !error && <p className="text-xs text-slate-600">{hint}</p>}
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
);

// ─── Input components ─────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
        error
          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
          : 'border-slate-700 focus:border-sky-500 focus:ring-sky-500/30'
      } ${className}`}
      {...props}
    />
  )
);
Input.displayName = 'Input';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:ring-1 transition-all resize-y ${
        error
          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
          : 'border-slate-700 focus:border-sky-500 focus:ring-sky-500/30'
      } ${className}`}
      {...props}
    />
  )
);
TextArea.displayName = 'TextArea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, options, className = '', ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border text-slate-200 text-sm appearance-none focus:outline-none focus:ring-1 transition-all ${
          error
            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
            : 'border-slate-700 focus:border-sky-500 focus:ring-sky-500/30'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
    </div>
  )
);
Select.displayName = 'Select';

// ─── Section header ───────────────────────────────────────────────────────────

const SectionHeader: React.FC<{ title: string; description?: string }> = ({
  title,
  description,
}) => (
  <div className="pb-3 mb-5 border-b border-slate-800">
    <h3 className="text-base font-semibold text-white">{title}</h3>
    {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
  </div>
);

// ─── Main Fields Component ────────────────────────────────────────────────────

export const ProjectFormFields: React.FC = () => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProjectSchemaType>();

  const title = watch('title');

  const handleTitleBlur = () => {
    const currentSlug = watch('slug');
    if (!currentSlug && title) {
      setValue('slug', generateSlug(title), { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-10">
      {/* ── Basic Info ── */}
      <section>
        <SectionHeader
          title="Basic Information"
          description="The core details that identify your project"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Project Title" name="title" error={errors.title?.message} >
            <Input
              id="title"
              placeholder="My Awesome Project"
              error={!!errors.title}
              {...register('title', {
                onBlur: (e) => {
                  handleTitleBlur();
                }
              })}
            />
          </Field>

          <Field
            label="Slug"
            name="slug"
            error={errors.slug?.message}
            required
            hint="Auto-generated from title. Used in URLs."
          >
            <div className="flex">
              <span className="flex items-center px-3 rounded-l-xl bg-slate-700 border border-r-0 border-slate-700 text-slate-500 text-sm">
                /projects/
              </span>
              <Input
                id="slug"
                placeholder="my-awesome-project"
                error={!!errors.slug}
                className="rounded-l-none"
                {...register('slug')}
              />
            </div>
          </Field>

          <div className="md:col-span-2">
            <Field
              label="Short Description"
              name="shortDescription"
              error={errors.shortDescription?.message}
              hint="A brief summary (max 200 chars) for project cards."
            >
              <TextArea
                id="shortDescription"
                rows={3}
                placeholder="A brief summary of what this project is about..."
                error={!!errors.shortDescription}
                {...register('shortDescription')}
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field
              label="Long Description"
              name="longDescription"
              error={errors.longDescription?.message}
              hint="Full case study or detailed description (supports rich text)."
            >
              <Controller
                name="longDescription"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Write a detailed case study..."
                  />
                )}
              />
            </Field>
          </div>
        </div>
      </section>

      {/* ── Media ── */}
      <section>
        <SectionHeader
          title="Media"
          description="Visual assets for your project"
        />
        <div className="space-y-6">
          <Controller
            name="thumbnailUrl"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <ImageUploader
                label="Thumbnail Image"
                singleMode
                value={field.value ? [field.value] : []}
                onChange={(urls) => field.onChange(urls[0] || '')}
                error={error?.message}
              />
            )}
          />

          <Controller
            name="galleryUrls"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <ImageUploader
                label="Project Gallery"
                value={field.value}
                onChange={field.onChange}
                error={error?.message}
                maxImages={5}
              />
            )}
          />
        </div>
      </section>

      {/* ── Meta & Links ── */}
      <section>
        <SectionHeader
          title="Links & Meta"
          description="External links, tech stack, and categorisation"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Category" name="category" error={errors.category?.message}>
            <Select
              id="category"
              {...register('category')}
              error={!!errors.category}
              options={PROJECT_CATEGORIES.map((c) => ({ value: c, label: c }))}
            />
          </Field>

          <Field label="Project Date" name="projectDate" error={errors.projectDate?.message}>
            <Input
              type="date"
              id="projectDate"
              error={!!errors.projectDate}
              {...register('projectDate')}
            />
          </Field>

          <Field label="GitHub URL" name="githubUrl" error={errors.githubUrl?.message}>
            <Input
              type="text"
              id="githubUrl"
              placeholder="https://github.com/..."
              error={!!errors.githubUrl}
              {...register('githubUrl')}
            />
          </Field>

          <Field label="Live Demo URL" name="liveDemoUrl" error={errors.liveDemoUrl?.message}>
            <Input
              type="text"
              id="liveDemoUrl"
              placeholder="https://my-app.com"
              error={!!errors.liveDemoUrl}
              {...register('liveDemoUrl')}
            />
          </Field>
          
          <Field label="Video URL" name="videoUrl" error={errors.videoUrl?.message}>
            <Input
              type="text"
              id="videoUrl"
              placeholder="https://youtube.com/..."
              error={!!errors.videoUrl}
              {...register('videoUrl')}
            />
          </Field>

          <div className="md:col-span-2">
            <Field
              label="Technologies"
              name="technologies"
              error={errors.technologies?.message}
            >
              <Controller
                name="technologies"
                control={control}
                render={({ field }) => (
                  <TechTagsInput
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.technologies?.message}
                  />
                )}
              />
            </Field>
          </div>
        </div>
      </section>

      {/* ── Deep Dive ── */}
      <section>
        <SectionHeader
          title="Deep Dive (Optional)"
          description="Additional context for case studies"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="My Role" name="role" error={errors.role?.message}>
            <Input
              id="role"
              placeholder="e.g. Lead Frontend Developer"
              error={!!errors.role}
              {...register('role')}
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Challenges Faced" name="challenges" error={errors.challenges?.message}>
              <TextArea
                id="challenges"
                rows={3}
                placeholder="What were the main technical challenges?"
                error={!!errors.challenges}
                {...register('challenges')}
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Solutions Implemented" name="solutions" error={errors.solutions?.message}>
              <TextArea
                id="solutions"
                rows={3}
                placeholder="How did you solve these challenges?"
                error={!!errors.solutions}
                {...register('solutions')}
              />
            </Field>
          </div>
        </div>
      </section>

      {/* ── Settings ── */}
      <section>
        <SectionHeader
          title="Settings"
          description="Display preferences and ordering"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-xl border border-slate-700">
            <input
              type="checkbox"
              id="featured"
              className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-800"
              {...register('featured')}
            />
            <label htmlFor="featured" className="text-sm font-medium text-slate-200 cursor-pointer">
              Featured Project
            </label>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-xl border border-slate-700">
            <input
              type="checkbox"
              id="visible"
              className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-800"
              {...register('visible')}
            />
            <label htmlFor="visible" className="text-sm font-medium text-slate-200 cursor-pointer">
              Visible on Portfolio
            </label>
          </div>

          <Field label="Status" name="status" error={errors.status?.message}>
            <Select
              id="status"
              {...register('status')}
              error={!!errors.status}
              options={[
                { value: 'Draft', label: 'Draft' },
                { value: 'Published', label: 'Published' }
              ]}
            />
          </Field>

          <Field label="Display Order" name="displayOrder" error={errors.displayOrder?.message}>
            <Input
              type="number"
              id="displayOrder"
              min="0"
              error={!!errors.displayOrder}
              {...register('displayOrder', { valueAsNumber: true })}
            />
          </Field>
        </div>
      </section>
    </div>
  );
};
