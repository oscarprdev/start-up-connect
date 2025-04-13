import type {
  CreateDafosUseCaseParams,
  DescribeDafosUseCaseParams,
  IDafosRepository,
} from '~~/server/domain/dafos/dafos.repository';
import type { Dafos } from '../db/schemas';
import { dafosTable } from '../db/schemas';
import { db } from '../db';
import { eq } from 'drizzle-orm';

export class DafosInfra implements IDafosRepository {
  async describe(params: DescribeDafosUseCaseParams): Promise<Dafos> {
    const [dafos] = await db.select().from(dafosTable).where(eq(dafosTable.ideaId, params.ideaId));
    return dafos;
  }

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
