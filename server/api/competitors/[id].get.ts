import { usePerplexity } from '~~/server/shared/use-perplexity';
import { authMiddleware } from '~~/server/shared/auth';
import { describeCompetitorsUseCase } from '~~/server/application/competitors/describe-competitors.use-case';
import { describeIdeasUseCase } from '~~/server/application/ideas/describe-ideas.use-case';

export default defineEventHandler(
  authMiddleware(async event => {
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Idea ID is required',
      });
    }

    const competitor = await describeCompetitorsUseCase.execute({ ideaId: id });
    if (competitor) {
      return {
        alreadyExists: true,
        competitors: competitor.analysis,
      };
    }

    const idea = await describeIdeasUseCase.execute({ ideaId: id });

    if (!idea) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Idea not found',
      });
    }

    const competitorsResponse = await usePerplexity({ ideaDescription: idea.description });

    return {
      alreadyExists: false,
      competitors: competitorsResponse,
    };
  })
);
