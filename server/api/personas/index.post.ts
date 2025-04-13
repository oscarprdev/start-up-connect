import { z } from 'zod';
import { authMiddleware } from '~~/server/shared/auth';
import { createPersonasUseCase } from '~~/server/application/personas/create-personas.use-case';

const bodySchema = z.object({
  ideaId: z.string(),
  description: z.string().min(1),
});

export default defineEventHandler(
  authMiddleware(async event => {
    const { ideaId, description } = await readValidatedBody(event, bodySchema.parse);

    await createPersonasUseCase.execute({ ideaId, description });

    return {
      statusMessage: 'Persona created successfully',
    };
  })
);
