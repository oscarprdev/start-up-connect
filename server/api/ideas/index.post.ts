import { z } from 'zod';
import { db } from '~~/server/db';
import type { Idea } from '~~/server/db/schemas';
import { ideaDTO, ideasTable } from '~~/server/db/schemas';
import { validateResponse } from '~~/server/utils/validate-response';

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

    return validateResponse(idea, ideaDTO);
  })
);

const storeIdea = async ({ title, description, userId }: StoreIdeaParams): Promise<Idea> => {
  const [idea] = await db.insert(ideasTable).values({
    title,
    description,
    userId,
  });
  return idea;
};
