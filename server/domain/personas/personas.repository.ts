import type { PersonaDTO } from './personas.schemas';

export interface IPersonasRepository {
  describe(params: DescribePersonasUseCaseParams): Promise<PersonaDTO | null>;
  create(params: CreatePersonasUseCaseParams): Promise<PersonaDTO>;
}

export interface DescribePersonasUseCaseParams {
  ideaId: string;
}

export interface CreatePersonasUseCaseParams {
  ideaId: string;
  description: string;
}
