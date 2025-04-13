import type {
  DescribePersonasUseCaseParams,
  IPersonasRepository,
} from '~~/server/domain/personas/personas.repository';
import { personasEntity } from '~~/server/domain/personas/personas.entity';
import type { PersonaDTO } from '~~/server/domain/personas/personas.schemas';

interface IDescribePersonasUseCase {
  execute(params: DescribePersonasUseCaseParams): Promise<PersonaDTO | null>;
}

export class DescribePersonasUseCase implements IDescribePersonasUseCase {
  constructor(private readonly personasRepository: IPersonasRepository) {}

  async execute(params: DescribePersonasUseCaseParams): Promise<PersonaDTO | null> {
    const persona = await this.personasRepository.describe(params);
    return persona;
  }
}

export const describePersonasUseCase = new DescribePersonasUseCase(personasEntity);
