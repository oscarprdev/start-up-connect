import { eq } from 'drizzle-orm';
import type { IIdeasRepository } from '~~/server/domain/ideas/ideas.repository';
import type { Idea } from '../db/schemas';
import { ideasTable } from '../db/schemas';
import { db } from '../db';

export class IdeasInfra implements IIdeasRepository {
  async list({ userId }: { userId: string }): Promise<Idea[]> {
    const ideas = await db.select().from(ideasTable).where(eq(ideasTable.userId, userId));
    return ideas;
  }
}
