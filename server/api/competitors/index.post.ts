import { competitorDTO, competitorsTable } from '~~/server/db/schemas';
import { z } from 'zod';
import { db } from '~~/server/db';
import { validateResponse } from '~~/server/utils/validate-response';

const bodySchema = z.object({
  ideaId: z.string(),
  analysis: z.string(),
});

export default defineEventHandler(
  authMiddleware(async event => {
    const { analysis, ideaId } = await readValidatedBody(event, bodySchema.parse);
    const response = await storeCompetitor({ ideaId, analysis });
    return validateResponse(response, competitorDTO);
  })
);

const storeCompetitor = async ({ ideaId, analysis }: { ideaId: string; analysis: string }) => {
  const [competitor] = await db
    .insert(competitorsTable)
    .values({
      analysis,
      ideaId,
    })
    .returning();
  return competitor;
};
