import { eq } from 'drizzle-orm';
import { db } from '~~/server/infra/db';
import type { BuyerPersona, Dafos } from '~~/server/infra/db/schemas';
import { buyerPersonasTable, dafosTable } from '~~/server/infra/db/schemas';
import { authMiddleware } from '~~/server/shared/auth';
import { getIdea } from '~~/server/shared/get-idea';
import type { SimpleBuyerPersonaSchema } from './types';
import { simpleBuyerPersonaSchema } from './types';
import { useOpenAI } from '~~/server/shared/use-openai';
import { validateResponse } from '~~/server/shared/validate-response';

export default defineEventHandler(
  authMiddleware(async event => {
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Idea ID is required',
      });
    }

    const persona = await getBuyerPersonas(id);
    if (persona) {
      return {
        alreadyExists: true,
        persona: {
          description: persona.description,
        },
      };
    }

    const idea = await getIdea(id);
    const dafo = await getDAFO(idea.id);

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

const getBuyerPersonas = async (id: string): Promise<BuyerPersona> => {
  const [persona] = await db.select().from(buyerPersonasTable).where(eq(buyerPersonasTable.id, id));
  return persona;
};

const getDAFO = async (ideaId: string): Promise<Dafos> => {
  const [dafo] = await db.select().from(dafosTable).where(eq(dafosTable.ideaId, ideaId));
  return dafo;
};
