import { db } from '~~/server/db';
import type { Dafos, Idea } from '~~/server/db/schemas';
import { dafoDTO, dafosTable, ideasTable } from '~~/server/db/schemas';
import { eq } from 'drizzle-orm';
import type { H3Event, EventHandlerRequest } from 'h3';
import type { SimpleDAFOSchema } from './types';
import { simpleDAFOSchema } from './types';
import { validateResponse } from '~~/server/utils/validate-response';
import { useOpenAI } from '~~/server/utils/use-openai';

export default defineEventHandler(
  authMiddleware(async event => {
    const idea = await getIdea(event);
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

const getIdea = async (event: H3Event<EventHandlerRequest>) => {
  const id = getRouterParam(event, 'id');
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Idea ID is required',
    });
  }

  const [idea] = await db.select().from(ideasTable).where(eq(ideasTable.id, id));
  if (!idea) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Idea not found',
    });
  }
  return idea;
};

const getCurrentDAFO = async (idea: Idea): Promise<Dafos | null> => {
  const [dafo] = await db.select().from(dafosTable).where(eq(dafosTable.ideaId, idea.id));
  return dafo;
};
