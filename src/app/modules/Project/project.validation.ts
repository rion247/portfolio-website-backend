import z from 'zod';

const projectValidationSchemaforCreate = z.object({
  body: z.object({
    title: z.string({ message: 'Project Title is required' }),
    description: z.string({ message: 'Project Description is required' }),
    image: z.string({ message: 'Image is required' }),
    liveLink: z.string({ message: 'Project Live Link is required' }),
    githubLink: z.string({ message: 'GitHub Link is required' }),
    technologies: z
      .array(z.string({ message: 'Project Technologies is required' }))
      .nonempty({ message: 'Project technologies are required!' }),
  }),
});

const projectValidationSchemaforUpdate = z.object({
  body: z.object({
    title: z.string({ message: 'Project Title is required' }).optional(),
    description: z
      .string({ message: 'Project Description is required' })
      .optional(),
    image: z.string({ message: 'Image is required' }).optional(),
    liveLink: z.string({ message: 'Project Live Link is required' }).optional(),
    githubLink: z.string({ message: 'GitHub Link is required' }).optional(),
    technologies: z
      .array(z.string({ message: 'Project Technologies is required' }))
      .nonempty({ message: 'Project technologies are required!' })
      .optional(),
  }),
});

export const ProjectValidationSchemas = {
  projectValidationSchemaforCreate,
  projectValidationSchemaforUpdate,
};
