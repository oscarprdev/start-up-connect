import { z } from 'zod';

export const simpleBuyerPersonaSchema = z.object({
  description: z.string().min(1),
});

export type SimpleBuyerPersonaSchema = z.infer<typeof simpleBuyerPersonaSchema>;
