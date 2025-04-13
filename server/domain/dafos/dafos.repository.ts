import type { Dafos } from '~~/server/infra/db/schemas';

export interface IDafosRepository {
  create(params: CreateDafosUseCaseParams): Promise<Dafos>;
}

export interface CreateDafosUseCaseParams {
  ideaId: string;
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
}
