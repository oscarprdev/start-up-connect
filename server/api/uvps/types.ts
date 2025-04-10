import { z } from 'zod';

export const simpleUVPSchema = z.object({
  text: z.string(),
});

export type SimpleUVPSchema = z.infer<typeof simpleUVPSchema>;
