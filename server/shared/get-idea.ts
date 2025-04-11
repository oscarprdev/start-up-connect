import { eq } from 'drizzle-orm';
import { ideasTable } from '../infra/db/schemas';
import { db } from '../infra/db';

export const getIdea = async (ideaId: string) => {
  const [idea] = await db.select().from(ideasTable).where(eq(ideasTable.id, ideaId));
  if (!idea) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Idea not found',
    });
  }
  return idea;
};
