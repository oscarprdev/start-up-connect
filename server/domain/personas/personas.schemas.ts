import { z } from 'zod';

export const personaSchema = z.object({
  description: z.string(),
});

export type PersonaDTO = z.infer<typeof personaSchema>;
