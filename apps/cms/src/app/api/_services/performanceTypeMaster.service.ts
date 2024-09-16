import { PerformanceTypeMasterPostIF } from '@repo/types/performanceTypeMaster';
import PerformanceTypeMasterRepo from '../_repos/performanceTypeMaster.repo';
import { GetAllQueryIF } from '@repo/types/response';

class PerformanceTypeMasterFactory {
  static async create({ payload }: { payload: PerformanceTypeMasterPostIF }) {
    return await new PerformanceTypeMaster(payload).create();
  }

  static async getOneById(id: number) {
    return await PerformanceTypeMasterRepo.getOneById(id);
  }

  // static async getByIdWithDetail(id: number) {
  //   return await getByIdWithDetail(id);
  // }

  static async getAll() {
    return await PerformanceTypeMasterRepo.getAll();
  }

  static async getAllWithQuery({ filter, range, sort }: GetAllQueryIF) {
    return await PerformanceTypeMasterRepo.getAllWithQuery({
      filter,
      range,
      sort,
    });
  }

  static async getAllPerformanceTypeMaster({
    filter,
    range,
    sort,
  }: GetAllQueryIF) {
    return await PerformanceTypeMasterRepo.getAllPerformanceTypeMaster({
      filter,
      range,
      sort,
    });
  }

  static async updateById({
    id,
    payload,
  }: {
    id: number;
    payload: PerformanceTypeMasterPostIF;
  }) {
    return await new PerformanceTypeMaster(payload).updateById({ id });
  }

  static async deleteById(id: number) {
    return await PerformanceTypeMasterRepo.deleteById(id);
  }

  static async deleteWithRelation(id: number) {
    return await PerformanceTypeMasterRepo.deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await PerformanceTypeMasterRepo.deleteManyById(ids);
  }
}

class PerformanceTypeMaster implements PerformanceTypeMasterPostIF {
  public typeName: string;
  public updatedAt: string | Date;

  public constructor({ typeName }: PerformanceTypeMasterPostIF) {
    this.typeName = typeName;
    this.updatedAt = new Date().toISOString();
  }

  public async create() {
    const payload: PerformanceTypeMasterPostIF = this;
    // TODO: validate payload
    return await PerformanceTypeMasterRepo.insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: PerformanceTypeMasterPostIF = this;
    // TODO: validate payload
    return await PerformanceTypeMasterRepo.updateById({ id, payload });
  }
}

export default PerformanceTypeMasterFactory;
