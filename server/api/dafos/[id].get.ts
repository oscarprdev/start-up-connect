import { db } from '~~/server/db';
import type { Dafos, Idea } from '~~/server/db/schemas';
import { dafoDTO, dafosTable } from '~~/server/db/schemas';
import { eq } from 'drizzle-orm';
import type { SimpleDAFOSchema } from './types';
import { simpleDAFOSchema } from './types';
import { validateResponse } from '~~/server/shared/validate-response';
import { useOpenAI } from '~~/server/shared/use-openai';
import { getIdea } from '~~/server/shared/get-idea';
import { authMiddleware } from '~~/server/shared/auth';

export default defineEventHandler(
  authMiddleware(async event => {
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Idea ID is required',
      });
    }

    const idea = await getIdea(id);
    const currentDAFO = await getCurrentDAFO(idea);
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

const getCurrentDAFO = async (idea: Idea): Promise<Dafos | null> => {
  const [dafo] = await db.select().from(dafosTable).where(eq(dafosTable.ideaId, idea.id));
  return dafo;
};
