import { db } from '~~/server/db';
import type { Idea } from '~~/server/db/schemas';
import { dafosTable, ideasTable } from '~~/server/db/schemas';
import { eq } from 'drizzle-orm';
import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import type { H3Event, EventHandlerRequest } from 'h3';

const dafoSchema = z.object({
  strengths: z.string(),
  weaknesses: z.string(),
  opportunities: z.string(),
  threats: z.string(),
});

export default defineEventHandler(
  authMiddleware(async event => {
    const idea = await getIdea(event);
    const dafo = await generateDAFO(idea);
    const dafos = await storeDAFO(dafo, idea.id);

    return dafos;
  })
);

const getIdea = async (event: H3Event<EventHandlerRequest>) => {
  const { id } = getRouterParams(event);
  const [idea] = await db.select().from(ideasTable).where(eq(ideasTable.id, id));
  return idea;
};

const generateDAFO = async (idea: Idea): Promise<typeof dafoSchema._type> => {
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
    schema: dafoSchema,
    prompt: `Generate a DAFO for the following idea: ${idea.description}`,
  });

  return object;
};

const storeDAFO = async (dafo: typeof dafoSchema._type, ideaId: string) => {
  const dafos = await db.insert(dafosTable).values({
    ...dafo,
    ideaId,
  });
  return dafos;
};
