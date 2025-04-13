import type { CreateUvpsUseCaseParams } from '~~/server/domain/uvps/uvps.repository';
import type { IUvpsEntity } from '~~/server/domain/uvps/uvps.entity';
import { uvpsEntity } from '~~/server/domain/uvps/uvps.entity';

interface ICreateUvpsUseCase {
  execute(params: CreateUvpsUseCaseParams): Promise<void>;
}

export class CreateUvpsUseCase implements ICreateUvpsUseCase {
  constructor(private readonly uvpsEntity: IUvpsEntity) {}

  async execute(params: CreateUvpsUseCaseParams): Promise<void> {
    await this.uvpsEntity.create(params);
  }
}

export const createUvpsUseCase = new CreateUvpsUseCase(uvpsEntity);
