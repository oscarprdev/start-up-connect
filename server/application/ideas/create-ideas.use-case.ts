import type { IIdeasEntity } from '~~/server/domain/ideas/ideas.entity';
import { IdeasEntity } from '~~/server/domain/ideas/ideas.entity';
import type { CreateIdeaParams } from '~~/server/domain/ideas/ideas.repository';
import { IdeasInfra } from '~~/server/infra/ideas/ideas.infra';

interface ICreateIdeasUseCase {
  execute(params: CreateIdeaParams): Promise<void>;
}

class CreateIdeasUseCase implements ICreateIdeasUseCase {
  constructor(private readonly ideasRepository: IIdeasEntity) {}

  async execute(params: CreateIdeaParams): Promise<void> {
    await this.ideasRepository.create(params);
  }
}

const ideasInfra = new IdeasInfra();
const ideasEntity = new IdeasEntity(ideasInfra);
export const createIdeasUseCase = new CreateIdeasUseCase(ideasEntity);
