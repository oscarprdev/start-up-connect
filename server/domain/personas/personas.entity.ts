import type {
  CreatePersonasUseCaseParams,
  DescribePersonasUseCaseParams,
  IPersonasRepository,
} from './personas.repository';
import type { PersonaDTO } from './personas.schemas';
import { PersonasInfra } from '~~/server/infra/personas/personas.infra';

export interface IPersonasEntity {
  describe(params: DescribePersonasUseCaseParams): Promise<PersonaDTO | null>;
  create(params: CreatePersonasUseCaseParams): Promise<PersonaDTO>;
}

export class PersonasEntity implements IPersonasEntity {
  constructor(private readonly personasRepository: IPersonasRepository) {}

  async describe(params: DescribePersonasUseCaseParams): Promise<PersonaDTO | null> {
    return this.personasRepository.describe(params);
  }

  async create(params: CreatePersonasUseCaseParams): Promise<PersonaDTO> {
    return this.personasRepository.create(params);
  }
}

const personasInfra = new PersonasInfra();
export const personasEntity = new PersonasEntity(personasInfra);
