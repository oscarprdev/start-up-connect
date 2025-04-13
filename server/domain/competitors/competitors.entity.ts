import { CompetitorsInfra } from '~~/server/infra/competitors/competitors.infra';
import type {
  CreateCompetitorsUseCaseParams,
  DescribeCompetitorsUseCaseParams,
  ICompetitorsRepository,
} from './competitors.repository';
import type { CompetitorDTO } from './competitors.schemas';

export interface ICompetitorsEntity {
  describe(params: DescribeCompetitorsUseCaseParams): Promise<CompetitorDTO | null>;
  create(params: CreateCompetitorsUseCaseParams): Promise<CompetitorDTO>;
}

export class CompetitorsEntity implements ICompetitorsEntity {
  constructor(private readonly competitorsRepository: ICompetitorsRepository) {}

  async describe(params: DescribeCompetitorsUseCaseParams): Promise<CompetitorDTO | null> {
    return this.competitorsRepository.describe(params);
  }

  async create(params: CreateCompetitorsUseCaseParams): Promise<CompetitorDTO> {
    return this.competitorsRepository.create(params);
  }
}

const competitorsInfra = new CompetitorsInfra();
export const competitorsEntity = new CompetitorsEntity(competitorsInfra);
