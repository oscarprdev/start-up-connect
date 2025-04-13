import { validateResponse } from '~~/server/shared/validate-response';
import type {
  CreateDafosUseCaseParams,
  DescribeDafosUseCaseParams,
  IDafosRepository,
} from './dafos.repository';
import { dafoDTO, type DafosDTO } from './dafos.schemas';

export interface IDafosEntity {
  describe(params: DescribeDafosUseCaseParams): Promise<DafosDTO | null>;
  create(params: CreateDafosUseCaseParams): Promise<DafosDTO>;
}

export class DafosEntity implements IDafosEntity {
  constructor(private readonly dafosRepository: IDafosRepository) {}

  async describe(params: DescribeDafosUseCaseParams): Promise<DafosDTO | null> {
    const dafos = await this.dafosRepository.describe(params);
    return dafos ? validateResponse(dafos, dafoDTO) : null;
  }

  async create(params: CreateDafosUseCaseParams): Promise<DafosDTO> {
    const dafos = await this.dafosRepository.create(params);
    return validateResponse(dafos, dafoDTO);
  }
}
