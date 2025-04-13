import { z } from 'zod';
import { authMiddleware } from '~~/server/shared/auth';
import { createUvpsUseCase } from '~~/server/application/uvps/create-uvps.use-case';

const bodySchema = z.object({
  text: z.string(),
  ideaId: z.string(),
});

export default defineEventHandler(
  authMiddleware(async event => {
    const { text, ideaId } = await readValidatedBody(event, bodySchema.parse);
    await createUvpsUseCase.execute({ ideaId, text });
    return {
      statusMessage: 'UVP created successfully',
    };
  })
);
