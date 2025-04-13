import type {
  DescribeDafosUseCaseParams,
  IDafosRepository,
} from '~~/server/domain/dafos/dafos.repository';
import { dafosEntity } from '~~/server/domain/dafos/dafos.entity';
import type { DafosDTO } from '~~/server/domain/dafos/dafos.schemas';

interface IDescribeDafosUseCase {
  execute(params: DescribeDafosUseCaseParams): Promise<DafosDTO | null>;
}

export class DescribeDafosUseCase implements IDescribeDafosUseCase {
  constructor(private readonly dafosRepository: IDafosRepository) {}

  async execute(params: DescribeDafosUseCaseParams): Promise<DafosDTO | null> {
    const dafos = await this.dafosRepository.describe(params);
    return dafos;
  }
}

export const describeDafosUseCase = new DescribeDafosUseCase(dafosEntity);
