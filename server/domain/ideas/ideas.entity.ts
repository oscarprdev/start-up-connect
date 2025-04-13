import type { IIdeasRepository, CreateIdeaParams, ListIdeasParams } from './ideas.repository';
import type { IdeaDTO } from './ideas.schemas';
import { validateIdea } from './ideas.schemas';

export interface IIdeasEntity {
  list(params: ListIdeasParams): Promise<IdeaDTO[]>;
  create(params: CreateIdeaParams): Promise<IdeaDTO>;
}

export class IdeasEntity implements IIdeasEntity {
  constructor(private readonly repo: IIdeasRepository) {}

  async list(params: ListIdeasParams): Promise<IdeaDTO[]> {
    const ideas = await this.repo.list(params);

    return ideas.length > 0 ? ideas.map(idea => validateIdea(idea)) : [];
  }

  async create(params: CreateIdeaParams): Promise<IdeaDTO> {
    const idea = await this.repo.create(params);

    return validateIdea(idea);
  }
}
