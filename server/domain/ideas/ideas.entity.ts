import { IdeasInfra } from '~~/server/infra/ideas/ideas.infra';
import type {
  IIdeasRepository,
  CreateIdeaParams,
  ListIdeasParams,
  DescribeIdeaParams,
} from './ideas.repository';
import type { IdeaDTO } from './ideas.schemas';
import { validateIdea } from './ideas.schemas';

export interface IIdeasEntity {
  describe(params: DescribeIdeaParams): Promise<IdeaDTO | null>;
  list(params: ListIdeasParams): Promise<IdeaDTO[]>;
  create(params: CreateIdeaParams): Promise<IdeaDTO>;
}

export class IdeasEntity implements IIdeasEntity {
  constructor(private readonly repo: IIdeasRepository) {}

  async describe(params: DescribeIdeaParams): Promise<IdeaDTO | null> {
    const idea = await this.repo.describe(params);

    return idea ? validateIdea(idea) : null;
  }

  async list(params: ListIdeasParams): Promise<IdeaDTO[]> {
    const ideas = await this.repo.list(params);

    return ideas.length > 0 ? ideas.map(idea => validateIdea(idea)) : [];
  }

  async create(params: CreateIdeaParams): Promise<IdeaDTO> {
    const idea = await this.repo.create(params);

    return validateIdea(idea);
  }
}

const ideasInfra = new IdeasInfra();
export const ideasEntity = new IdeasEntity(ideasInfra);
