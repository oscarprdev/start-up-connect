import type { IIdeasEntity } from '~~/server/domain/ideas/ideas.entity';
import { ideasEntity } from '~~/server/domain/ideas/ideas.entity';
import type { IdeaDTO } from '~~/server/domain/ideas/ideas.schemas';

interface DescribeIdeasUseCaseParams {
  ideaId: string;
}

export class DescribeIdeasUseCase {
  constructor(private readonly ideasEntity: IIdeasEntity) {}

  async execute(params: DescribeIdeasUseCaseParams): Promise<IdeaDTO | null> {
    return this.ideasEntity.describe(params);
  }
}

export const describeIdeasUseCase = new DescribeIdeasUseCase(ideasEntity);
