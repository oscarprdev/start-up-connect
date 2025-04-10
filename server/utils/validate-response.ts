import type { z } from 'zod';

export const validateResponse = <T>(response: T, schema: z.ZodSchema<T>) => {
  const result = schema.safeParse(response);
  if (!result.success) {
    throw createError({ statusCode: 400, statusMessage: result.error.message });
  }
  return result.data;
};
