import type { Idea } from '~~/server/infra/db/schemas';

export interface IIdeasRepository {
  list({ userId }: { userId: string }): Promise<Idea[]>;
}
