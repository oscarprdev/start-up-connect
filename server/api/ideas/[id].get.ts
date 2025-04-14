import { describeIdeasUseCase } from '~~/server/application/ideas/describe-ideas.use-case';
import { authMiddleware } from '~~/server/shared/auth';

export default defineEventHandler(
  authMiddleware(async event => {
    const { id } = getRouterParams(event);
    if (!id) {
      return createError({
        statusCode: 400,
        statusMessage: 'Idea ID is required',
      });
    }

    const idea = await describeIdeasUseCase.execute({ ideaId: id });

    return idea;
  })
);
