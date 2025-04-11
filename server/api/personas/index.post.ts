import { z } from 'zod';
import { db } from '~~/server/db';
import { buyerPersonaDTO, buyerPersonasTable } from '~~/server/db/schemas';
import { authMiddleware } from '~~/server/shared/auth';
import { validateResponse } from '~~/server/shared/validate-response';

const bodySchema = z.object({
  ideaId: z.string(),
  description: z.string().min(1),
});

export default defineEventHandler(
  authMiddleware(async event => {
    const { ideaId, description } = await readValidatedBody(event, bodySchema.parse);

    const persona = await storeBuyerPersona({ ideaId, description });

    return validateResponse(persona, buyerPersonaDTO);
  })
);

const storeBuyerPersona = async ({
  ideaId,
  description,
}: {
  ideaId: string;
  description: string;
}) => {
  const [persona] = await db.insert(buyerPersonasTable).values({ ideaId, description }).returning();

  return persona;
};
