import { PerformancePostIF } from '@repo/types/performance';
import { generateClient } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';

class PerformanceRepo {
  getAll = async () => {
    return await new BaseRepo(generateClient().performaceManagement).getAll();
  };

  count = async () => {
    return await new BaseRepo(generateClient().performaceManagement).count();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(
      generateClient().performaceManagement
    ).getAllWithQuery({ sort, range, filter });
  };

  getAllAndParent = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(
      generateClient().performaceManagement
    ).getAllWithParm({
      sort,
      range,
      filter,
      include: {
        performanceTypeMaster: true,
        acsta: true,
      },
    });
  };

  getOneById = async (id: number) => {
    return await new BaseRepo(generateClient().performaceManagement).getOneById(
      id
    );
  };
  getOneAndParent = async (id: number) => {
    return await new BaseRepo(
      generateClient().performaceManagement
    ).getOneByIdWithParam(id, {
      include: {
        performanceTypeMaster: true,
        acsta: true,
      },
    });
  };

  insert = async (payload: PerformancePostIF) => {
    await new BaseRepo(
      generateClient().idLastestOfRecord
    ).updateIdLastestOfRecord({
      record: payload.record,
    });
    delete payload.record;
    return await new BaseRepo(generateClient().performaceManagement).insert(
      payload
    );
  };

  insertMany = async (products: PerformancePostIF[]) => {
    console.log('products: ', products);

    return await new BaseRepo(generateClient().performaceManagement).insertMany(
      products
    );
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: PerformancePostIF;
  }) => {
    return await new BaseRepo(generateClient().performaceManagement).updateById(
      {
        id,
        payload,
      }
    );
  };

  updateManyById = async (updates: PerformancePostIF[]) => {
    return await new BaseRepo(
      generateClient().performaceManagement
    ).updateManyById(updates);
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(
      generateClient().performaceManagement
    ).safetyDeletePerformById(id);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(
      generateClient().performaceManagement
    ).deleteManyById(ids);
  };
}

export default new PerformanceRepo();
