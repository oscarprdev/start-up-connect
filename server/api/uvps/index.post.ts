import { z } from 'zod';
import { db } from '~~/server/infra/db';
import { uvpsTable, uvpsDTO } from '~~/server/infra/db/schemas';
import { authMiddleware } from '~~/server/shared/auth';
import { validateResponse } from '~~/server/shared/validate-response';

const bodyShema = z.object({
  text: z.string(),
  ideaId: z.string(),
});

export default defineEventHandler(
  authMiddleware(async event => {
    const { text, ideaId } = await readValidatedBody(event, bodyShema.parse);
    const response = await storeUVPS(text, ideaId);
    return validateResponse(response, uvpsDTO);
  })
);

const storeUVPS = async (text: string, ideaId: string) => {
  const [uvps] = await db.insert(uvpsTable).values({ text, ideaId }).returning();
  return uvps;
};
