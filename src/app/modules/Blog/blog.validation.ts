import z from 'zod';

const blogValidationSchemaforCreate = z.object({
  body: z.object({
    title: z.string({ message: 'Blog Title is required' }),
    content: z.string({ message: 'Blog Content is required' }),
    image: z.string({ message: 'Image is required' }),
    category: z.string({ message: 'Blog Category Live Link is required' }),
  }),
});

const blogValidationSchemaforUpdate = z.object({
  body: z.object({
    title: z.string({ message: 'Blog Title is required' }).optional(),
    content: z.string({ message: 'Blog Content is required' }).optional(),
    image: z.string({ message: 'Image is required' }).optional(),
    category: z
      .string({ message: 'Blog Category Live Link is required' })
      .optional(),
  }),
});

export const BlogValidationSchemas = {
  blogValidationSchemaforCreate,
  blogValidationSchemaforUpdate,
};
