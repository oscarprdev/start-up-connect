import { db } from '~~/server/db';
import type { SimpleDAFOSchema } from './types';
import { simpleDAFOSchema } from './types';
import { z } from 'zod';
import type { Dafos } from '~~/server/db/schemas';
import { dafosTable, dafoDTO } from '~~/server/db/schemas';
import { validateResponse } from '~~/server/utils/validate-response';

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
      ...dafo,
      ideaId,
    })
    .returning();
  return dafos;
};
