import type {
  CreateCompetitorsUseCaseParams,
  DescribeCompetitorsUseCaseParams,
  ICompetitorsRepository,
} from '~~/server/domain/competitors/competitors.repository';
import type { Competitor } from '../db/schemas';
import { competitorsTable } from '../db/schemas';
import { db } from '../db';
import { eq } from 'drizzle-orm';

export class CompetitorsInfra implements ICompetitorsRepository {
  async describe(params: DescribeCompetitorsUseCaseParams): Promise<Competitor | null> {
    const [competitor] = await db
      .select()
      .from(competitorsTable)
      .where(eq(competitorsTable.ideaId, params.ideaId));
    return competitor || null;
  }

  async create(params: CreateCompetitorsUseCaseParams): Promise<Competitor> {
    const [competitor] = await db
      .insert(competitorsTable)
      .values({
        ideaId: params.ideaId,
        analysis: params.analysis,
      })
      .returning();
    return competitor;
  }
}
