import { z } from 'zod';

export const simpleDAFOSchema = z.object({
  strengths: z.string(),
  weaknesses: z.string(),
  opportunities: z.string(),
  threats: z.string(),
});

export type SimpleDAFOSchema = z.infer<typeof simpleDAFOSchema>;
