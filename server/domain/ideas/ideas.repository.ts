import type { Idea } from '~~/server/infra/db/schemas';

export interface IIdeasRepository {
  describe(params: DescribeIdeaParams): Promise<Idea | null>;
  list(params: ListIdeasParams): Promise<Idea[]>;
  create(params: CreateIdeaParams): Promise<Idea>;
}

export interface DescribeIdeaParams {
  ideaId: string;
}

export interface ListIdeasParams {
  userId: string;
}

export interface CreateIdeaParams {
  title: string;
  description: string;
  userId: string;
}
