import type { CreateDafosUseCaseParams } from '~~/server/domain/dafos/dafos.repository';
import { DafosEntity, type IDafosEntity } from '~~/server/domain/dafos/dafos.entity';
import { DafosInfra } from '~~/server/infra/dafos/dafos.infra';

interface ICreateDafosUseCase {
  execute(params: CreateDafosUseCaseParams): Promise<void>;
}

export class CreateDafosUseCase implements ICreateDafosUseCase {
  constructor(private readonly dafosRepository: IDafosEntity) {}

  async execute(params: CreateDafosUseCaseParams): Promise<void> {
    await this.dafosRepository.create(params);
  }
}

const dafosInfra = new DafosInfra();
const dafosEntity = new DafosEntity(dafosInfra);
export const createDafosUseCase = new CreateDafosUseCase(dafosEntity);
