import { IdeasEntity, type IIdeasEntity } from '~~/server/domain/ideas/ideas.entity';
import type { IdeaDTO } from '~~/server/domain/ideas/ideas.schemas';
import { IdeasInfra } from '~~/server/infra/ideas/ideas.infra';

interface IListIdeasUsecase {
  execute({ userId }: { userId: string }): Promise<IdeaDTO[]>;
}

class ListIdeasUsecase implements IListIdeasUsecase {
  constructor(private readonly ideas: IIdeasEntity) {}

  async execute({ userId }: { userId: string }): Promise<IdeaDTO[]> {
    const ideas = await this.ideas.list({ userId });
    return ideas;
  }
}

const ideasInfra = new IdeasInfra();
const ideasEntity = new IdeasEntity(ideasInfra);
export const listIdeasUsecase = new ListIdeasUsecase(ideasEntity);
