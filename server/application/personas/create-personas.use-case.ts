import type { CreatePersonasUseCaseParams } from '~~/server/domain/personas/personas.repository';
import { personasEntity, type IPersonasEntity } from '~~/server/domain/personas/personas.entity';

interface ICreatePersonasUseCase {
  execute(params: CreatePersonasUseCaseParams): Promise<void>;
}

export class CreatePersonasUseCase implements ICreatePersonasUseCase {
  constructor(private readonly personasRepository: IPersonasEntity) {}

  async execute(params: CreatePersonasUseCaseParams): Promise<void> {
    await this.personasRepository.create(params);
  }
}

export const createPersonasUseCase = new CreatePersonasUseCase(personasEntity);
