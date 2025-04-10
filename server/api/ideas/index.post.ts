import { z } from 'zod';
import { db } from '~~/server/db';
import { ideasTable } from '~~/server/db/schemas';

interface StoreIdeaParams {
  title: string;
  description: string;
  userId: string;
}

const bodySchema = z.object({
  title: z.string(),
  description: z.string(),
});

export default defineEventHandler(
  authMiddleware(async event => {
    const { title, description } = await readValidatedBody(event, bodySchema.parse);
    const idea = await storeIdea({ title, description, userId: event.context.user.id });

    return idea;
  })
);

const storeIdea = async ({ title, description, userId }: StoreIdeaParams) => {
  const idea = await db.insert(ideasTable).values({
    title,
    description,
    userId,
  });
  return idea;
};
