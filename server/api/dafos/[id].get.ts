import { dafoDTO } from '~~/server/infra/db/schemas';
import type { SimpleDAFOSchema } from './types';
import { simpleDAFOSchema } from './types';
import { validateResponse } from '~~/server/shared/validate-response';
import { useOpenAI } from '~~/server/shared/use-openai';
import { authMiddleware } from '~~/server/shared/auth';
import { describeIdeasUseCase } from '~~/server/application/ideas/describe-ideas.use-case';
import { describeDafosUseCase } from '~~/server/application/dafos/describe-dafos.use-case';

export default defineEventHandler(
  authMiddleware(async event => {
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Idea ID is required',
      });
    }

    const idea = await describeIdeasUseCase.execute({ ideaId: id });
    if (!idea) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Idea not found',
      });
    }
    const currentDAFO = await describeDafosUseCase.execute({ ideaId: idea.id });
    if (currentDAFO) {
      return {
        alreadyExists: true,
        dafo: validateResponse(currentDAFO, dafoDTO),
      };
    }

    const dafo = await useOpenAI<SimpleDAFOSchema>({
      schema: simpleDAFOSchema,
      prompt: `You are an expert business consultant.
        Generate a SWOT analysis for the following business idea: ${idea.description}. 
        Every field should be composed of at least 3-5 sentences.`,
    });

    return {
      alreadyExists: false,
      dafo: validateResponse(dafo, simpleDAFOSchema),
    };
  })
);
