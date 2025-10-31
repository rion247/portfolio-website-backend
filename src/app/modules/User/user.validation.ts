import z from "zod";

const userValidationSchemaforRegister = z.object({
  body: z.object({
    user: z.object({
      name: z.string({ message: "User Name is required" }),
      email: z.email({ message: "User Email is required" }),
      password: z.string({ message: "Password is required" }),
    }),
  }),
});

export const userValidationSchemas = {
  userValidationSchemaforRegister,
};
