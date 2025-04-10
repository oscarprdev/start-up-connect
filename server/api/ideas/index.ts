import { eq } from 'drizzle-orm';
import { db } from '~~/server/db';
import type { Idea } from '~~/server/db/schemas';
import { ideaDTO, ideasTable } from '~~/server/db/schemas';
import { validateResponse } from '~~/server/utils/validate-response';

export default defineEventHandler(
  authMiddleware(async event => {
    const { id } = getRouterParams(event);
    const idea = await getIdea(id);
    return validateResponse(idea, ideaDTO);
  })
);

const getIdea = async (ideaId: string): Promise<Idea> => {
  const [idea] = await db.select().from(ideasTable).where(eq(ideasTable.id, ideaId));
  return idea;
};
