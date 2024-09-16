import AplicationMasterService from '../services/applicationMaster.sercvice';
import { OK, CREATED } from '../core/success.response';

class AplicationMasterController {
  getAll = async () => {
    return new OK({
      message: 'get all AplicationMasters success!',
      metadata: await AplicationMasterService.getAll(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get AplicationMaster by id success!',
      metadata: await AplicationMasterService.getOneById(id),
    });
  };

  getManyByIds = async (ids: number[]) => {
    return new OK({
      message: 'get many AplicationMaster success!',
      metadata: await AplicationMasterService.getManyByIds(ids),
    });
  };

  getByBundleId = async () => {
    return new OK({
      message: 'get AplicationMaster by bundleId success!',
      metadata: await AplicationMasterService.getOneByBundleId(),
    });
  };
}

const applicationMasterController = new AplicationMasterController();
export default applicationMasterController;
