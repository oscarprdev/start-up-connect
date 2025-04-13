import type {
  DescribeCompetitorsUseCaseParams,
  ICompetitorsRepository,
} from '~~/server/domain/competitors/competitors.repository';
import { competitorsEntity } from '~~/server/domain/competitors/competitors.entity';
import type { CompetitorDTO } from '~~/server/domain/competitors/competitors.schemas';

interface IDescribeCompetitorsUseCase {
  execute(params: DescribeCompetitorsUseCaseParams): Promise<CompetitorDTO | null>;
}

export class DescribeCompetitorsUseCase implements IDescribeCompetitorsUseCase {
  constructor(private readonly competitorsRepository: ICompetitorsRepository) {}

  async execute(params: DescribeCompetitorsUseCaseParams): Promise<CompetitorDTO | null> {
    const competitor = await this.competitorsRepository.describe(params);
    return competitor;
  }
}

export const describeCompetitorsUseCase = new DescribeCompetitorsUseCase(competitorsEntity);
