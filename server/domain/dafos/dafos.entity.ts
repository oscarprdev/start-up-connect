import type { CreateDafosUseCaseParams, IDafosRepository } from './dafos.repository';

export interface IDafosEntity {
  create(params: CreateDafosUseCaseParams): Promise<void>;
}

export class DafosEntity implements IDafosEntity {
  constructor(private readonly dafosRepository: IDafosRepository) {}

  async create(params: CreateDafosUseCaseParams): Promise<void> {
    await this.dafosRepository.create(params);
  }
}
