import { IdeasEntity, type IIdeasEntity } from '~~/server/domain/ideas/ideas.entity';
import type { IdeaDTO } from '~~/server/domain/ideas/ideas.schemas';
import type { ListIdeasParams } from '~~/server/domain/ideas/ideas.repository';
import { IdeasInfra } from '~~/server/infra/ideas/ideas.infra';

interface IListIdeasUsecase {
  execute(params: ListIdeasParams): Promise<IdeaDTO[]>;
}

class ListIdeasUsecase implements IListIdeasUsecase {
  constructor(private readonly ideas: IIdeasEntity) {}

  async execute(params: ListIdeasParams): Promise<IdeaDTO[]> {
    const ideas = await this.ideas.list(params);
    return ideas;
  }
}

const ideasInfra = new IdeasInfra();
const ideasEntity = new IdeasEntity(ideasInfra);
export const listIdeasUsecase = new ListIdeasUsecase(ideasEntity);
