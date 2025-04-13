import type {
  CreateUvpsUseCaseParams,
  DescribeUvpsUseCaseParams,
  IUvpsRepository,
} from '~~/server/domain/uvps/uvps.repository';
import type { Uvps } from '../db/schemas';
import { uvpsTable } from '../db/schemas';
import { db } from '../db';
import { eq } from 'drizzle-orm';

export class UvpsInfra implements IUvpsRepository {
  async describe(params: DescribeUvpsUseCaseParams): Promise<Uvps | null> {
    const [uvp] = await db.select().from(uvpsTable).where(eq(uvpsTable.ideaId, params.ideaId));
    return uvp || null;
  }

  async create(params: CreateUvpsUseCaseParams): Promise<Uvps> {
    const [uvp] = await db
      .insert(uvpsTable)
      .values({
        ideaId: params.ideaId,
        text: params.text,
      })
      .returning();
    return uvp;
  }
}
