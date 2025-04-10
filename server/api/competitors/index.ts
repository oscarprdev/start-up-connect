import { db } from '~~/server/db';
import type { Competitor, Idea } from '~~/server/db/schemas';
import { competitorDTO, competitorsTable, ideasTable } from '~~/server/db/schemas';
import { eq } from 'drizzle-orm';
import { validateResponse } from '~~/server/utils/validate-response';
import { usePerplexity } from '~~/server/utils/use-perplexity';

export default defineEventHandler(
  authMiddleware(async event => {
    const { id } = getRouterParams(event);
    const competitors = await getCompetitors(id);
    if (competitors) {
      const validResponse = validateResponse(competitors, competitorDTO);
      return validResponse.analysis;
    }

    const idea = await getIdea(id);
    const competitorsResponse = await usePerplexity({ ideaDescription: idea.description });

    return competitorsResponse;
  })
);

const getCompetitors = async (ideaId: string): Promise<Competitor> => {
  const [competitors] = await db
    .select()
    .from(competitorsTable)
    .where(eq(competitorsTable.ideaId, ideaId));
  return competitors;
};

const getIdea = async (ideaId: string): Promise<Idea> => {
  const [idea] = await db.select().from(ideasTable).where(eq(ideasTable.id, ideaId));
  return idea;
};
