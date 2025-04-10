import type { Dafos, Idea, Uvps } from '~~/server/db/schemas';
import { dafosTable, uvpsTable } from '~~/server/db/schemas';
import { db } from '~~/server/db';
import { eq } from 'drizzle-orm';
import { simpleUVPSchema } from './types';
import { useOpenAI } from '~~/server/shared/use-openai';
import { validateResponse } from '~~/server/shared/validate-response';
import { authMiddleware } from '~~/server/shared/auth';
import { getIdea } from '~~/server/shared/get-idea';

export default defineEventHandler(
  authMiddleware(async event => {
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Idea ID is required',
      });
    }
    const currentUVPS = await getUVPS(id);
    if (currentUVPS) {
      return {
        alreadyExists: true,
        uvps: {
          text: currentUVPS.text,
        },
      };
    }

    const idea = await getIdea(id);
    const dafo = await getDAFO(idea);

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

const getUVPS = async (ideaId: string): Promise<Uvps> => {
  const [uvp] = await db.select().from(uvpsTable).where(eq(uvpsTable.ideaId, ideaId));
  return uvp;
};

const getDAFO = async (idea: Idea): Promise<Dafos> => {
  const [dafo] = await db.select().from(dafosTable).where(eq(dafosTable.ideaId, idea.id));
  return dafo;
};
