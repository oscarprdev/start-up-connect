import type {
  CreatePersonasUseCaseParams,
  DescribePersonasUseCaseParams,
  IPersonasRepository,
} from '~~/server/domain/personas/personas.repository';
import type { BuyerPersona } from '../db/schemas';
import { buyerPersonasTable } from '../db/schemas';
import { db } from '../db';
import { eq } from 'drizzle-orm';

export class PersonasInfra implements IPersonasRepository {
  async describe(params: DescribePersonasUseCaseParams): Promise<BuyerPersona | null> {
    const [persona] = await db
      .select()
      .from(buyerPersonasTable)
      .where(eq(buyerPersonasTable.ideaId, params.ideaId));
    return persona || null;
  }

  async create(params: CreatePersonasUseCaseParams): Promise<BuyerPersona> {
    const [persona] = await db
      .insert(buyerPersonasTable)
      .values({
        ideaId: params.ideaId,
        description: params.description,
      })
      .returning();
    return persona;
  }
}
