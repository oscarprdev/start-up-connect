import type { DafosDTO } from '~~/server/domain/dafos/dafos.schemas';

export interface IDafosRepository {
  describe(params: DescribeDafosUseCaseParams): Promise<DafosDTO | null>;
  create(params: CreateDafosUseCaseParams): Promise<DafosDTO>;
}

export interface DescribeDafosUseCaseParams {
  ideaId: string;
}

export interface CreateDafosUseCaseParams {
  ideaId: string;
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
}
