import {
  PerformanceApiResponseIF,
  PerformanceResponseIF,
} from '@repo/types/performance';
import {
  getAll,
  getOneById,
  getManyByIds,
  getUpdateData,
  getAllByAcstaId,
} from '../repos/performance.repo';
import { NotFoundError } from '@/core/error.response';
import { getPresignedUrl } from '@/lib/cloudflare-r2';
import { getAcstaIdByBundleId } from '@/helpers/getRecordId';

class PerformanceFactory {
  static async getOneById(id: number) {
    const res = await getOneById(id);
    if (!res) throw new NotFoundError('Product not found');

    return await new Performance().getData(res);
  }

  static async getAllByBundleId() {
    const acstaId = await getAcstaIdByBundleId();
    if (!acstaId) return [];

    let performances: string | any[] = [];

    const validAcstaIds = acstaId.filter((id) => id !== undefined);
    for (const id of validAcstaIds) {
      const performance = await getAllByAcstaId(id);
      performances = [...performances, ...performance];
    }

    if (!performances?.length) return [];
    return await this.convertArrayData(performances);
  }

  static async getAll() {
    const performances = await getAll();
    if (!performances?.length) throw new NotFoundError('Product not found');
    return await this.convertArrayData(performances);
  }

  static async getManyByIds(ids: number[]) {
    const performances = await getManyByIds(ids);
    if (!performances?.length) throw new NotFoundError('Product not found');

    return await this.convertArrayData(performances);
  }

  static async getUpdateData(lastSyncDate: Date | string) {
    const acstaId = await getAcstaIdByBundleId();
    if (!acstaId) return [];

    const performances = await getUpdateData(lastSyncDate, acstaId);
    if (!performances?.length) return [];

    return await this.convertArrayData(performances);
  }

  static async convertArrayData(apps: PerformanceResponseIF[]) {
    let result = [];
    for (const app of apps) {
      result.push(await new Performance().getData(app));
    }
    return result;
  }
}

class Performance {
  async getData({
    id,
    performanceTypeMasterId,
    assetBundleIOS,
    acstaId,
    assetBundleAndroid,
  }: PerformanceApiResponseIF) {
    return {
      modeId: id,
      modeTypeId: performanceTypeMasterId,
      acstaId,
      assetBundleIOS: await getPresignedUrl(assetBundleIOS),
      assetBundleAndroid: await getPresignedUrl(assetBundleAndroid),
    };
  }
}

export default PerformanceFactory;
