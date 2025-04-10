import { competitorDTO, competitorsTable } from '~~/server/db/schemas';
import { z } from 'zod';
import { db } from '~~/server/db';
import { validateResponse } from '~~/server/utils/validate-response';

const bodySchema = z.object({
  ideaId: z.string(),
  analisys: z.string(),
});

export default defineEventHandler(
  authMiddleware(async event => {
    const { analisys, ideaId } = await readValidatedBody(event, bodySchema.parse);
    const response = await storeCompetitor({ ideaId, analisys });
    return validateResponse(response, competitorDTO);
  })
);

const storeCompetitor = async ({ ideaId, analisys }: { ideaId: string; analisys: string }) => {
  const [competitor] = await db
    .insert(competitorsTable)
    .values({
      analisys,
      ideaId,
    })
    .returning();
  return competitor;
};
