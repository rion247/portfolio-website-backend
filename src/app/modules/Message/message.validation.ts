import z from 'zod';

const messageValidationSchemaforCreate = z.object({
  body: z.object({
    message: z.string({ message: 'Message is required' }),
  }),
});
export const MessageValidationSchemas = {
  messageValidationSchemaforCreate,
};
