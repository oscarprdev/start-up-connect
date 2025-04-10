import { z } from 'zod';
import { ideaDTO } from '~~/server/domain/ideas/ideas.schemas';
import { db } from '~~/server/infra/db';
import type { Idea } from '~~/server/infra/db/schemas';
import { ideasTable } from '~~/server/infra/db/schemas';
import { authMiddleware } from '~~/server/shared/auth';
import { validateResponse } from '~~/server/shared/validate-response';

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
  const [idea] = await db
    .insert(ideasTable)
    .values({
      title,
      description,
      userId,
    })
    .returning();
  return idea;
};
