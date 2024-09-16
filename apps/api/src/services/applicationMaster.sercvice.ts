import { NotFoundError } from '@/core/error.response';
import { getBundleId } from '@/lib/globalObject';
import {
  AplicationMasterPostIF,
  AplicationMasterResponseIF,
} from '@repo/types/applicationMaster';
import { getPresignedUrl } from '../lib/cloudflare-r2';
import {
  getAll,
  getManyByIds,
  getOneByBundleId,
  getOneById,
  getUpdateData,
} from '../repos/applicationMaster.repo';

class ApplicationMasterFactory {
  static async getAll() {
    const applicationMasters = await getAll();

    if (!applicationMasters?.length) {
      throw new NotFoundError('Application not found');
    }

    return await this.convertArrayData(applicationMasters);
  }

  static async getOneById(id: number) {
    const applicationMaster: AplicationMasterResponseIF = await getOneById(id);

    return await new ApplicationMaster().convertData(applicationMaster);
  }

  static async getOneByBundleId() {
    const bundleId = getBundleId();
    if (!bundleId) {
      throw new NotFoundError('bundleId not found');
    }

    const application = await getOneByBundleId(bundleId);
    if (!application) {
      return {};
    }

    const [contentUrlLicense, contentUrlTermsOfUse] = await Promise.all([
      getPresignedUrl(application.license.content as string),
      getPresignedUrl(application.termOfUse.content as string),
    ]);

    const dataApp = await new ApplicationMaster().convertData(application);

    return {
      ...dataApp,
      license: { contentUrl: contentUrlLicense },
      termOfUse: { contentUrl: contentUrlTermsOfUse },
    };
  }

  static async getManyByIds(ids: number[]) {
    const applicationMasters = await getManyByIds(ids);
    if (!applicationMasters?.length) {
      throw new NotFoundError('Application not found');
    }

    return await this.convertArrayData(applicationMasters);
  }

  static async getUpdateData(lastSyncDate: Date | string) {
    const bundleId = getBundleId();
    if (!bundleId) {
      throw new NotFoundError('bundleId not found');
    }

    const app = await getUpdateData(lastSyncDate, bundleId);

    console.log("app debug")
    console.log(app)

    if (!app) {
      console.log("app not found")
      return {};
    }
    
    console.log("app found")

    const [contentUrlLicense, contentUrlTermsOfUse] = await Promise.all([
      getPresignedUrl(app.license.content as string),
      getPresignedUrl(app.termOfUse.content as string),
    ]);

    const dataApp = await new ApplicationMaster().convertData(app);

    return {
      ...dataApp,
      license: { contentUrl: contentUrlLicense },
      termOfUse: { contentUrl: contentUrlTermsOfUse },
    };
  }

  static async convertArrayData(apps: AplicationMasterResponseIF[]) {
    let result = [];
    for (const app of apps) {
      result.push(await new ApplicationMaster().convertData(app));
    }
    return result;
  }
}

class ApplicationMaster {
  async convertData({
    id,
    appName,
    assetBundleIOS,
    assetBundleAndroid,
    outlineUrl,
  }: AplicationMasterPostIF) {
    return {
      appId: id,
      appName,
      assetBundleIOS: await getPresignedUrl(assetBundleIOS),
      assetBundleAndroid: await getPresignedUrl(assetBundleAndroid),
      outlineUrl: await getPresignedUrl(outlineUrl),
    };
  }
}

export default ApplicationMasterFactory;
