import { ideasTable, ideaDTO } from '~~/server/db/schemas';
import { eq } from 'drizzle-orm';
import { db } from '~~/server/db';
import { validateResponse } from '~~/server/shared/validate-response';
import { authMiddleware } from '~~/server/shared/auth';

export default defineEventHandler(
  authMiddleware(async event => {
    try {
      const ideas = await getIdeas(event.context.user.id);

      return {
        ideas: ideas.length > 0 ? ideas.map(idea => validateResponse(idea, ideaDTO)) : [],
      };
    } catch {
      return createError({
        statusCode: 500,
        statusMessage: 'Unexpected error',
      });
    }
  })
);

const getIdeas = async (userId: string) => {
  const ideas = await db.select().from(ideasTable).where(eq(ideasTable.userId, userId));
  return ideas;
};
