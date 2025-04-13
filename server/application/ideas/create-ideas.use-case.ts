import type { IIdeasEntity } from '~~/server/domain/ideas/ideas.entity';
import { ideasEntity } from '~~/server/domain/ideas/ideas.entity';
import type { CreateIdeaParams } from '~~/server/domain/ideas/ideas.repository';

interface ICreateIdeasUseCase {
  execute(params: CreateIdeaParams): Promise<void>;
}

class CreateIdeasUseCase implements ICreateIdeasUseCase {
  constructor(private readonly ideasRepository: IIdeasEntity) {}

  async execute(params: CreateIdeaParams): Promise<void> {
    await this.ideasRepository.create(params);
  }
}

export const createIdeasUseCase = new CreateIdeasUseCase(ideasEntity);
