import type { Idea } from '~~/server/infra/db/schemas';

export interface IIdeasRepository {
  list(params: ListIdeasParams): Promise<Idea[]>;
  create(params: CreateIdeaParams): Promise<Idea>;
}

export interface CreateIdeaParams {
  title: string;
  description: string;
  userId: string;
}

export interface ListIdeasParams {
  userId: string;
}
