import { z } from 'zod';

export const uvpSchema = z.object({
  text: z.string(),
});

export type UvpDTO = z.infer<typeof uvpSchema>;
