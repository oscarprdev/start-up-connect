import { z } from 'zod';

export const simpleBuyerPersonaSchema = z.object({
  description: z.string(),
});

export type SimpleBuyerPersonaSchema = z.infer<typeof simpleBuyerPersonaSchema>;
