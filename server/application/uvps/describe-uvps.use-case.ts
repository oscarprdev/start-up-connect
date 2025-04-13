import type { DescribeUvpsUseCaseParams } from '~~/server/domain/uvps/uvps.repository';
import type { IUvpsEntity } from '~~/server/domain/uvps/uvps.entity';
import { uvpsEntity } from '~~/server/domain/uvps/uvps.entity';
import type { UvpDTO } from '~~/server/domain/uvps/uvps.schemas';

interface IDescribeUvpsUseCase {
  execute(params: DescribeUvpsUseCaseParams): Promise<UvpDTO | null>;
}

export class DescribeUvpsUseCase implements IDescribeUvpsUseCase {
  constructor(private readonly uvpsEntity: IUvpsEntity) {}

  async execute(params: DescribeUvpsUseCaseParams): Promise<UvpDTO | null> {
    return this.uvpsEntity.describe(params);
  }
}

export const describeUvpsUseCase = new DescribeUvpsUseCase(uvpsEntity);
