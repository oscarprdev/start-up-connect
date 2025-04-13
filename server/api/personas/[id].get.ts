import { authMiddleware } from '~~/server/shared/auth';
import type { SimpleBuyerPersonaSchema } from './types';
import { simpleBuyerPersonaSchema } from './types';
import { useOpenAI } from '~~/server/shared/use-openai';
import { validateResponse } from '~~/server/shared/validate-response';
import { describePersonasUseCase } from '~~/server/application/personas/describe-personas.use-case';
import { describeDafosUseCase } from '~~/server/application/dafos/describe-dafos.use-case';
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

    const persona = await describePersonasUseCase.execute({ ideaId: id });
    if (persona) {
      return {
        alreadyExists: true,
        persona: {
          description: persona.description,
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

    const personaResponse = await useOpenAI<SimpleBuyerPersonaSchema>({
      schema: simpleBuyerPersonaSchema,
      prompt: `You are an expert business consultant and marketing leader.
        Generate a buyer persona for the following business idea: ${idea.description}. 
        Take into account the following SWOT analysis: {
            strengths: ${dafo.strengths}
            weaknesses: ${dafo.weaknesses}
            opportunities: ${dafo.opportunities}
            threats: ${dafo.threats}
        }.
        The buyer persona should be a semi-fictional profile of your ideal customer based on real data, research, and educated assumptions.
        It helps the business to understand who the customer is, what they need, what motivates them, and how they make buying decisions — so the business can market, sell, and build better for them.`,
    });

    return {
      alreadyExists: false,
      persona: validateResponse(personaResponse, simpleBuyerPersonaSchema),
    };
  })
);
