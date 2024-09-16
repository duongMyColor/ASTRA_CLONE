import LicenseService from '../services/license.service';
import { OK } from '../core/success.response';

class LicenseController {
  getAll = async () => {
    return new OK({
      message: 'get all License success!',
      metadata: await LicenseService.getAll(),
    });
  };

  getCurrentLicense = async () => {
    return new OK({
      message: 'get latest License success!',
      metadata: await LicenseService.getCurrentLicense(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get License by id success!',
      metadata: await LicenseService.getOneById(id),
    });
  };
}

const licenseController = new LicenseController();
export default licenseController;
