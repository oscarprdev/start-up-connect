import { z } from 'zod';
import { db } from '~~/server/db';
import { ideasTable } from '~~/server/db/schemas';

const bodySchema = z.object({
  title: z.string(),
  description: z.string(),
});

export default defineEventHandler(
  authMiddleware(async event => {
    const { title, description } = await readValidatedBody(event, bodySchema.parse);

    const idea = await db
      .insert(ideasTable)
      .values({
        title,
        description,
        userId: event.context.user.id,
      })
      .returning();

    return idea;
  })
);
