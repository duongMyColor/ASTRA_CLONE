import { OK } from '../core/success.response';
import ApplicationMasterService from '@/services/applicationMaster.sercvice';
import AcstaService from '@/services/acsta.service';
import PerformanceService from '@/services/performance.service';
import { getDb } from '@/lib/globalObject';

async function getUpdatedTables(lastSyncDate: Date | string) {
  const prisma = getDb();

  const updatedTables = await prisma.bootUpdate.findMany({
    where: {
      updatedAt: {
        gt: lastSyncDate,
      },
    },
  });
  return updatedTables.map((entry: { tableName: string }) => entry.tableName);
}

class DataController {
  getInitData = async () => {
    return new OK({
      message: 'get all License success!',
      metadata: {
        applicationMaster: await ApplicationMasterService.getOneByBundleId(),
        acsta: await AcstaService.getAllByBundleId(),
        performance: await PerformanceService.getAllByBundleId(),
      },
    });
  };

  getUpdateData = async (lastSyncDate: Date | string) => {
    const updatedTables = await getUpdatedTables(lastSyncDate);
    const acstaData = await AcstaService.getUpdateData();
    if (!updatedTables.length) {
      return new OK({
        message: 'No updated data',
        metadata: {
          acsta: acstaData,
        },
      });
    }

    return new OK({
      message: 'get updated data success!',
      metadata: {
        applicationMaster:
          await ApplicationMasterService.getUpdateData(lastSyncDate),
        acsta: acstaData,
        performance: await PerformanceService.getUpdateData(lastSyncDate),
      },
    });
  };
}

const licenseController = new DataController();
export default licenseController;
