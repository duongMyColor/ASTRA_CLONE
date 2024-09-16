import {
  getCurrentTermOfUse,
  getOneById,
  getAll,
} from '../repos/termOfUse.repo';
import { getPresignedUrl } from '../lib/cloudflare-r2';
import { NotFoundError } from '@/core/error.response';
import { getBundleId } from '@/lib/globalObject';
import { getOneByBundleId } from '@/repos/applicationMaster.repo';

class TermOfUseService {
  static async getAll() {
    const result = await getAll();
    if (!result?.length) {
      throw new NotFoundError('Term of use not found');
    }
    return result;
  }

  static async getCurrentTermOfUse() {

    const bundleId = getBundleId();

    if (!bundleId) {
      throw new NotFoundError('bundleId not found');
    }
    const application = await getOneByBundleId(bundleId);
    if (!application) {
      throw new NotFoundError('Application not found');
    }
    const currentTermsOfUse = await getCurrentTermOfUse(
      application.termsOfUseId
    );
    if (!currentTermsOfUse) {
      throw new NotFoundError('Term of use not found');
    }

    const contentUrl = await getPresignedUrl(
      currentTermsOfUse?.content as string
    );
    return { contentUrl };
  }

  static async getOneById(id: number) {
    const termOfUse = await getOneById(id);
    if (!termOfUse) {
      throw new NotFoundError('Term of use not found');
    }

    const contentUrl = await getPresignedUrl(termOfUse?.content as string);
    return { contentUrl };
  }
}
export default TermOfUseService;
