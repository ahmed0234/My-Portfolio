// src/lib/validations/contact.ts

import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),

  email: z.string().email("Invalid email"),

  projectDetails: z.string(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
