import AcstaService from '../services/acsta.service';
import { OK } from '../core/success.response';

class AcstaController {
  getAll = async () => {
    return new OK({
      message: 'get all Acsta success!',
      metadata: await AcstaService.getAll(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get Acsta success!',
      metadata: await AcstaService.getOneById(id),
    });
  };

  getManyByIds = async (ids: number[]) => {
    return new OK({
      message: 'get many Acsta success!',
      metadata: await AcstaService.getManyByIds(ids),
    });
  };

  getManyByIdsAndChildren = async (ids: number[]) => {
    return new OK({
      message: 'get many Acsta success!',
      metadata: await AcstaService.getManyByIdsAndChildren(ids),
    });
  };

  getAllByBundleId = async () => {
    return new OK({
      message: 'get many Acsta by bundleId success!',
      metadata: await AcstaService.getAllByBundleId(),
    });
  };
}

const acstaController = new AcstaController();
export default acstaController;
