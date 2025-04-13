import { simpleDAFOSchema } from './types';
import { z } from 'zod';
import { authMiddleware } from '~~/server/shared/auth';
import { createDafosUseCase } from '~~/server/application/dafos/create-dafos.use-case';

const bodyShema = z.object({
  dafo: simpleDAFOSchema,
  ideaId: z.string(),
});

export default defineEventHandler(
  authMiddleware(async event => {
    const { dafo, ideaId } = await readValidatedBody(event, bodyShema.parse);
    await createDafosUseCase.execute({
      ideaId,
      strengths: dafo.strengths,
      weaknesses: dafo.weaknesses,
      opportunities: dafo.opportunities,
      threats: dafo.threats,
    });

    return {
      statusMessage: 'DAFO created successfully',
    };
  })
);
