import { UvpsInfra } from '~~/server/infra/uvps/uvps.infra';
import type {
  CreateUvpsUseCaseParams,
  DescribeUvpsUseCaseParams,
  IUvpsRepository,
} from './uvps.repository';
import type { UvpDTO } from './uvps.schemas';

export interface IUvpsEntity {
  describe(params: DescribeUvpsUseCaseParams): Promise<UvpDTO | null>;
  create(params: CreateUvpsUseCaseParams): Promise<UvpDTO>;
}

export class UvpsEntity implements IUvpsEntity {
  constructor(private readonly uvpsRepository: IUvpsRepository) {}

  async describe(params: DescribeUvpsUseCaseParams): Promise<UvpDTO | null> {
    return this.uvpsRepository.describe(params);
  }

  async create(params: CreateUvpsUseCaseParams): Promise<UvpDTO> {
    return this.uvpsRepository.create(params);
  }
}

const uvpsInfra = new UvpsInfra();
export const uvpsEntity = new UvpsEntity(uvpsInfra);
