import type { CreateCompetitorsUseCaseParams } from '~~/server/domain/competitors/competitors.repository';
import {
  competitorsEntity,
  type ICompetitorsEntity,
} from '~~/server/domain/competitors/competitors.entity';

interface ICreateCompetitorsUseCase {
  execute(params: CreateCompetitorsUseCaseParams): Promise<void>;
}

export class CreateCompetitorsUseCase implements ICreateCompetitorsUseCase {
  constructor(private readonly competitorsRepository: ICompetitorsEntity) {}

  async execute(params: CreateCompetitorsUseCaseParams): Promise<void> {
    await this.competitorsRepository.create(params);
  }
}

export const createCompetitorsUseCase = new CreateCompetitorsUseCase(competitorsEntity);
