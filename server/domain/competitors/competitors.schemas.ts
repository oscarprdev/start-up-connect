import { z } from 'zod';

export const competitorSchema = z.object({
  analysis: z.string(),
});

export type CompetitorDTO = z.infer<typeof competitorSchema>;
