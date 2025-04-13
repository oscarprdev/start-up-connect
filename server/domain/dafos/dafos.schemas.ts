import { z } from 'zod';
import type { Dafos } from '~~/server/infra/db/schemas';

export const validateDafos = (dafos: Dafos) => {
  const result = dafoDTO.safeParse(dafos);
  if (!result.success) {
    throw createError({ statusCode: 400, statusMessage: result.error.message });
  }
  return result.data;
};

export type DafosDTO = z.infer<typeof dafoDTO>;

export const dafoDTO = z.object({
  id: z.string(),
  strengths: z.string(),
  weaknesses: z.string(),
  opportunities: z.string(),
  threats: z.string(),
});
