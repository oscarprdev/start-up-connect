import { z } from 'zod';
import type { Idea } from '~~/server/infra/db/schemas';

export const validateIdea = (idea: Idea) => {
  const result = ideaDTO.safeParse(idea);
  if (!result.success) {
    throw createError({ statusCode: 400, statusMessage: result.error.message });
  }
  return result.data;
};

export type IdeaDTO = z.infer<typeof ideaDTO>;

export const ideaDTO = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
