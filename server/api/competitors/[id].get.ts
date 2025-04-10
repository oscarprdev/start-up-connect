import { db } from '~~/server/db';
import type { Competitor } from '~~/server/db/schemas';
import { competitorDTO, competitorsTable } from '~~/server/db/schemas';
import { eq } from 'drizzle-orm';
import { validateResponse } from '~~/server/utils/validate-response';
import { usePerplexity } from '~~/server/utils/use-perplexity';

export default defineEventHandler(
  authMiddleware(async event => {
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Idea ID is required',
      });
    }

    const competitors = await getCompetitors(id);
    if (competitors) {
      const validResponse = validateResponse(competitors, competitorDTO);
      return {
        alreadyExists: true,
        competitors: validResponse.analysis,
      };
    }

    const idea = await getIdea(id);
    const competitorsResponse = await usePerplexity({ ideaDescription: idea.description });

    return {
      alreadyExists: false,
      competitors: competitorsResponse,
    };
  })
);

const getCompetitors = async (ideaId: string): Promise<Competitor> => {
  const [competitors] = await db
    .select()
    .from(competitorsTable)
    .where(eq(competitorsTable.ideaId, ideaId));
  return competitors;
};
