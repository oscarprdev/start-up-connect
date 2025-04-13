import { simpleUVPSchema } from './types';
import { useOpenAI } from '~~/server/shared/use-openai';
import { validateResponse } from '~~/server/shared/validate-response';
import { authMiddleware } from '~~/server/shared/auth';
import { describeUvpsUseCase } from '~~/server/application/uvps/describe-uvps.use-case';
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

    const uvp = await describeUvpsUseCase.execute({ ideaId: id });
    if (uvp) {
      return {
        alreadyExists: true,
        uvps: {
          text: uvp.text,
        },
      };
    }

    const idea = await describeIdeasUseCase.execute({ ideaId: id });
    if (!idea) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Idea not found',
      });
    }

    const dafo = await describeDafosUseCase.execute({ ideaId: idea.id });
    if (!dafo) {
      throw createError({
        statusCode: 404,
        statusMessage: 'DAFO not found for this idea',
      });
    }

    const response = await useOpenAI({
      schema: simpleUVPSchema,
      prompt: `You are an expert marketing leader.
        Generate a UVP for the following business idea: ${idea.description}. 
        Take into account the following SWOT analysis: {
            strengths: ${dafo.strengths}
            weaknesses: ${dafo.weaknesses}
            opportunities: ${dafo.opportunities}
            threats: ${dafo.threats}
        }.
        The UVP should be a single sentence that captures the value proposition of the business.
        The UVP should be original, unique and precise with the needs of the customer in mind.
        The UVP should be no more than 20 words.`,
    });

    return {
      alreadyExists: false,
      uvps: validateResponse(response, simpleUVPSchema),
    };
  })
);
