import PerformanceService from '../services/performance.service';
import { OK } from '../core/success.response';

class PerformanceController {
  getAll = async () => {
    return new OK({
      message: 'get all Product success!',
      metadata: await PerformanceService.getAll(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get Product success!',
      metadata: await PerformanceService.getOneById(id),
    });
  };

  getManyByIds = async (ids: number[]) => {
    return new OK({
      message: 'get many Product success!',
      metadata: await PerformanceService.getManyByIds(ids),
    });
  };

  getAllByBundleId = async () => {
    return new OK({
      message: 'get many Acsta by bundleId success!',
      metadata: await PerformanceService.getAllByBundleId(),
    });
  };
}

const performanceController = new PerformanceController();
export default performanceController;
