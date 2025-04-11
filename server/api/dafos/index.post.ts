import { db } from '~~/server/infra/db';
import type { SimpleDAFOSchema } from './types';
import { simpleDAFOSchema } from './types';
import { z } from 'zod';
import type { Dafos } from '~~/server/infra/db/schemas';
import { dafosTable, dafoDTO } from '~~/server/infra/db/schemas';
import { validateResponse } from '~~/server/shared/validate-response';
import { authMiddleware } from '~~/server/shared/auth';

const bodyShema = z.object({
  dafo: simpleDAFOSchema,
  ideaId: z.string(),
});

export default defineEventHandler(
  authMiddleware(async event => {
    const { dafo, ideaId } = await readValidatedBody(event, bodyShema.parse);
    const response = await storeDAFO(dafo, ideaId);

    return validateResponse(response, dafoDTO);
  })
);

const storeDAFO = async (dafo: SimpleDAFOSchema, ideaId: string): Promise<Dafos> => {
  const [dafos] = await db
    .insert(dafosTable)
    .values({
      strengths: dafo.strengths,
      weaknesses: dafo.weaknesses,
      opportunities: dafo.opportunities,
      threats: dafo.threats,
      ideaId,
    })
    .returning();
  return dafos;
};
