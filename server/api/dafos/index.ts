import { db } from '~~/server/db';
import type { Idea } from '~~/server/db/schemas';
import { ideasTable } from '~~/server/db/schemas';
import { eq } from 'drizzle-orm';
import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import type { H3Event, EventHandlerRequest } from 'h3';
import type { SimpleDAFOSchema } from './types';
import { simpleDAFOSchema } from './types';
import { validateResponse } from '~~/server/utils/validate-response';

export default defineEventHandler(
  authMiddleware(async event => {
    const idea = await getIdea(event);
    const dafo = await generateDAFO(idea);

    return validateResponse(dafo, simpleDAFOSchema);
  })
);

const getIdea = async (event: H3Event<EventHandlerRequest>) => {
  const { id } = getRouterParams(event);
  const [idea] = await db.select().from(ideasTable).where(eq(ideasTable.id, id));
  return idea;
};

const generateDAFO = async (idea: Idea): Promise<SimpleDAFOSchema> => {
  const apiKey = useRuntimeConfig().openaiApiKey;
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OpenAI API key is not set',
    });
  }

  const openai = createOpenAI({
    compatibility: 'strict',
    apiKey,
  });

  const { object } = await generateObject({
    model: openai.responses('gpt-4o'),
    schema: simpleDAFOSchema,
    prompt: `Generate a DAFO for the following idea: ${idea.description}`,
  });

  return object;
};
