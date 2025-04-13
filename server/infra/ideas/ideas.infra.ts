import { eq } from 'drizzle-orm';
import type {
  IIdeasRepository,
  CreateIdeaParams,
  ListIdeasParams,
} from '~~/server/domain/ideas/ideas.repository';
import type { Idea } from '../db/schemas';
import { ideasTable } from '../db/schemas';
import { db } from '../db';

export class IdeasInfra implements IIdeasRepository {
  async list(params: ListIdeasParams): Promise<Idea[]> {
    const ideas = await db.select().from(ideasTable).where(eq(ideasTable.userId, params.userId));
    return ideas;
  }

  async create(params: CreateIdeaParams): Promise<Idea> {
    const idea = await db.insert(ideasTable).values(params).returning();
    return idea[0];
  }
}
