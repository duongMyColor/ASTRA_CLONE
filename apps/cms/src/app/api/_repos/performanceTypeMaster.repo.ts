import { PerformanceTypeMasterPostIF } from '@repo/types/performanceTypeMaster';
import { generateClient } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';

const relationFieldName = 'Performance';

class PerformanceTypeMasterRepo {
  getAll = async () => {
    return await new BaseRepo(generateClient().performaceTypeMaster).getAll();
  };

  count = async () => {
    return await new BaseRepo(generateClient().performaceTypeMaster).countAll();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(
      generateClient().performaceTypeMaster
    ).getAllWithQuery({ sort, range, filter });
  };
  getAllPerformanceTypeMaster = async ({
    sort,
    range,
    filter,
  }: GetAllQueryIF) => {
    return await new BaseRepo(
      generateClient().performaceTypeMaster
    ).getAllPerformanceTypeMaster({
      sort,
      range,
      filter,
    });
  };

  getOneById = async (id: number) => {
    return await new BaseRepo(generateClient().performaceTypeMaster).getOneById(
      id
    );
  };

  // const getByIdWithDetail = async (id: number) => {
  //   const product = awai tmodel.findUnique({
  //     where: {
  //       id: id,
  //     },
  //     include: {
  //       Performance: true,
  //     },
  //   });
  //   return product;
  // };

  insert = async (payload: PerformanceTypeMasterPostIF) => {
    return await new BaseRepo(generateClient().performaceTypeMaster).insert(
      payload
    );
  };

  insertMany = async (products: PerformanceTypeMasterPostIF[]) => {
    return await new BaseRepo(generateClient().performaceTypeMaster).insertMany(
      products
    );
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: PerformanceTypeMasterPostIF;
  }) => {
    return await new BaseRepo(generateClient().performaceTypeMaster).updateById(
      {
        id,
        payload,
      }
    );
  };

  updateManyById = async (
    updates: { id: number; data: PerformanceTypeMasterPostIF }[]
  ) => {
    return await new BaseRepo(
      generateClient().performaceTypeMaster
    ).updateManyById(updates);
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(generateClient().performaceTypeMaster).deleteById(
      id
    );
  };

  deleteWithRelation = async (id: number) => {
    return await new BaseRepo(
      generateClient().performaceTypeMaster
    ).deleteWithRelation(id, relationFieldName);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(
      generateClient().performaceTypeMaster
    ).deleteManyById(ids);
  };
}

export default new PerformanceTypeMasterRepo();
