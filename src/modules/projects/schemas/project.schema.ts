import { z } from 'zod';

const urlSchema = z.string().optional();

export const projectSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(100, 'Title must be 100 characters or less'),
    slug: z
      .string()
      .min(1, 'Slug is required')
      .max(120, 'Slug must be 120 characters or less')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
    shortDescription: z
      .string()
      .max(200, 'Short description must be 200 characters or less')
      .optional()
      .default(''),
    longDescription: z.string().optional().default(''),
    technologies: z
      .array(z.string())
      .optional()
      .default([]),
    category: z.enum([
      'Web App',
      'Mobile App',
      'Full Stack',
      'API / Backend',
      'DevOps / Tools',
      'Open Source',
      'Other',
    ]).default('Web App'),
    githubUrl: urlSchema,
    liveDemoUrl: urlSchema,
    videoUrl: urlSchema,
    thumbnailUrl: z.string().optional().default(''),
    galleryUrls: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    visible: z.boolean().default(true),
    status: z.enum(['Draft', 'Published']).default('Draft'),
    displayOrder: z
      .number({ invalid_type_error: 'Display order must be a number' })
      .int('Display order must be an integer')
      .min(0, 'Display order must be 0 or greater')
      .default(0),
    projectDate: z.string().optional().default(''),
    role: z
      .string()
      .max(100, 'Role must be 100 characters or less')
      .optional()
      .default(''),
    challenges: z
      .string()
      .max(1000, 'Challenges must be 1000 characters or less')
      .optional()
      .default(''),
    solutions: z
      .string()
      .max(1000, 'Solutions must be 1000 characters or less')
      .optional()
      .default(''),
  });

export type ProjectSchemaType = z.infer<typeof projectSchema>;
