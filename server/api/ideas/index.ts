import { authMiddleware } from '~~/server/shared/auth';
import { listIdeasUsecase } from '~~/server/application/ideas/list-ideas.use-case';

export default defineEventHandler(
  authMiddleware(async event => {
    try {
      const userId = event.context.user.id;
      const ideas = await listIdeasUsecase.execute({ userId });

      return {
        statusMessage: 'Ideas listed successfully',
        ideas,
      };
    } catch {
      return createError({
        statusCode: 500,
        statusMessage: 'Unexpected error',
      });
    }
  })
);
