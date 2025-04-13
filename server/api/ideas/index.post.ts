import { z } from 'zod';
import { createIdeasUseCase } from '~~/server/application/ideas/create-ideas.use-case';
import { authMiddleware } from '~~/server/shared/auth';

const bodySchema = z.object({
  title: z.string(),
  description: z.string(),
});

export default defineEventHandler(
  authMiddleware(async event => {
    const { title, description } = await readValidatedBody(event, bodySchema.parse);
    const userId = event.context.user.id;
    await createIdeasUseCase.execute({ title, description, userId });

    return {
      statusMessage: 'Idea created successfully',
    };
  })
);
