import { AcstaApiResponseIF } from '@repo/types/acsta';
import {
  getAll,
  getOneById,
  getManyByIdsAndChildren,
  getManyByIds,
  getUpdateData,
  getAllByAppId,
} from '../repos/acsta.repo';
import { PerformanceResponseIF } from '@repo/types/performance';
import { getPresignedUrl } from '@/lib/cloudflare-r2';
import { NotFoundError } from '@/core/error.response';

import { getApplicationId } from '@/helpers/getRecordId';

class AcstaFactory {
  static async getAll() {
    const acstas = await getAll();

    if (!acstas?.length) {
      throw new NotFoundError('No Acsta found');
    }

    return await this.convertArrayData(acstas);
  }

  static async getAllByBundleId() {
    const applicationId = await getApplicationId();

    const acstas = await getAllByAppId(applicationId);

    if (!acstas?.length) {
      return [];
    }

    return await this.convertArrayData(acstas);
  }

  static async getOneById(id: number) {
    const applicationId = await getApplicationId();

    const result = await getOneById(id, applicationId);

    if (!result) {
      throw new NotFoundError('No Acsta found');
    }

    return result;
  }

  static async getManyByIds(ids: number[]) {
    const applicationId = await getApplicationId();

    const acstas = await getManyByIds(ids, applicationId);
    if (!acstas?.length) {
      throw new NotFoundError('No Acsta found');
    }

    return await this.convertArrayData(acstas);
  }

  static async getManyByIdsAndChildren(ids: number[]) {
    const applicationId = await getApplicationId();

    const acstas = await getManyByIdsAndChildren(ids, applicationId);
    if (!acstas?.length) {
      throw new NotFoundError('No Acsta found');
    }

    return await this.convertArrayData(acstas);
  }

  static async getUpdateData() {
    const applicationId = await getApplicationId();

    const acstas = await getUpdateData(applicationId);

    if (!acstas?.length) {
      return [];
    }
    return await this.convertArrayData(acstas);
  }

  static async convertArrayData(apps: AcstaApiResponseIF[]) {
    let result = [];
    for (const app of apps) {
      result.push(await new Acsta().getData(app));
    }
    return result;
  }
}

class Acsta {
  async getData({
    id,
    acstaName,
    applicationId,
    thumbnailUrl,
    scanImageUrl,
    scanOriginX,
    scanOriginY,
    scanWidth,
    scanHeight,
    scanColors,
    performace,
  }: AcstaApiResponseIF) {
    return {
      acstaId: id,
      appId: applicationId,
      acstaName,

      thumbnailUrl: await getPresignedUrl(thumbnailUrl),
      scanImageUrl: await getPresignedUrl(scanImageUrl),
      scanOriginX: scanOriginX,
      scanOriginY: scanOriginY,
      scanWidth: scanWidth,
      scanHeight: scanHeight,
      scanColors: JSON.parse(scanColors as string),
      modeId: performace
        ? performace.map((p: PerformanceResponseIF) => p.id)
        : [],
    };
  }
}

export default AcstaFactory;
