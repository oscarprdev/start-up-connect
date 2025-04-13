import type { CompetitorDTO } from './competitors.schemas';

export interface ICompetitorsRepository {
  describe(params: DescribeCompetitorsUseCaseParams): Promise<CompetitorDTO | null>;
  create(params: CreateCompetitorsUseCaseParams): Promise<CompetitorDTO>;
}

export interface DescribeCompetitorsUseCaseParams {
  ideaId: string;
}

export interface CreateCompetitorsUseCaseParams {
  ideaId: string;
  analysis: string;
}
