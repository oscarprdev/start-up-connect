import type {
  CreateDafosUseCaseParams,
  IDafosRepository,
} from '~~/server/domain/dafos/dafos.repository';
import type { Dafos } from '../db/schemas';
import { dafosTable } from '../db/schemas';
import { db } from '../db';

export class DafosInfra implements IDafosRepository {
  async create(params: CreateDafosUseCaseParams): Promise<Dafos> {
    const [dafos] = await db
      .insert(dafosTable)
      .values({
        ideaId: params.ideaId,
        strengths: params.strengths,
        weaknesses: params.weaknesses,
        opportunities: params.opportunities,
        threats: params.threats,
      })
      .returning();
    return dafos;
  }
}
