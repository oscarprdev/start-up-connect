import { z } from 'zod';
import { authMiddleware } from '~~/server/shared/auth';
import { createCompetitorsUseCase } from '~~/server/application/competitors/create-competitors.use-case';

const bodySchema = z.object({
  ideaId: z.string(),
  analysis: z.string(),
});

export default defineEventHandler(
  authMiddleware(async event => {
    const { analysis, ideaId } = await readValidatedBody(event, bodySchema.parse);
    await createCompetitorsUseCase.execute({ ideaId, analysis });
    return {
      statusMessage: 'Competitor created successfully',
    };
  })
);
