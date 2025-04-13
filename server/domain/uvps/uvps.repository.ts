import type { UvpDTO } from './uvps.schemas';

export interface IUvpsRepository {
  describe(params: DescribeUvpsUseCaseParams): Promise<UvpDTO | null>;
  create(params: CreateUvpsUseCaseParams): Promise<UvpDTO>;
}

export interface DescribeUvpsUseCaseParams {
  ideaId: string;
}

export interface CreateUvpsUseCaseParams {
  ideaId: string;
  text: string;
}
