import { BadRequestError, NotFoundError } from '@/core/error.response';
import { getPresignedUrl } from '../lib/cloudflare-r2';
import { getCurrentLicense, getOneById, getAll } from '../repos/license.repo';
import { getBundleId } from '@/lib/globalObject';
import { getOneByBundleId } from '@/repos/applicationMaster.repo';

class LicenseService {
  static async getAll() {
    const licenses = await getAll();
    if (!licenses?.length) {
      throw new NotFoundError('License not found');
    }
    return licenses;
  }

  static async getCurrentLicense() {
    const bundleId = getBundleId();

    if (!bundleId) {
      throw new NotFoundError('bundleId not found');
    }
    const application = await getOneByBundleId(bundleId);
    if (!application) {
      throw new NotFoundError('Application not found');
    }

    const currentLicense = await getCurrentLicense(application.licenseId);
    if (!currentLicense) {
      throw new NotFoundError('License not found');
    }
    const contentUrl = await getPresignedUrl(currentLicense?.content as string);

    return { contentUrl };
  }

  static async getOneById(id: number) {
    const license = await getOneById(id);
    if (!license) {
      throw new NotFoundError('License not found');
    }
    const contentUrl = await getPresignedUrl(license?.content as string);
    return { contentUrl };
  }
}

export default LicenseService;
