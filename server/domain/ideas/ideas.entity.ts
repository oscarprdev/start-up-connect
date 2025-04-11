import type { IIdeasRepository } from './ideas.repository';
import type { IdeaDTO } from './ideas.schemas';
import { validateIdea } from './ideas.schemas';

export interface IIdeasEntity {
  list({ userId }: { userId: string }): Promise<IdeaDTO[]>;
}

export class IdeasEntity implements IIdeasEntity {
  constructor(private readonly repo: IIdeasRepository) {}

  async list({ userId }: { userId: string }): Promise<IdeaDTO[]> {
    const ideas = await this.repo.list({ userId });

    return ideas.length > 0 ? ideas.map(idea => validateIdea(idea)) : [];
  }
}
