import { AplicationMasterPostIF } from '@repo/types/applicationMaster';
import { generateClient } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';

class AplicationMasterRepo {
  getAll = async () => {
    return await new BaseRepo(generateClient().aplicationMaster).getAllActive();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(
      generateClient().aplicationMaster
    ).getAllWithFilter({
      sort,
      range,
      filter,
    });
  };
  getAllWithFilters = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(
      generateClient().aplicationMaster
    ).getAllWithFilters({
      sort,
      range,
      filter,
    });
  };

  getManyReference = async (params: GetManyReferenceParams) => {
    return new BaseRepo(generateClient().aplicationMaster).getManyReference(
      params
    );
  };

  getOneById = async (id: number) => {
    return await new BaseRepo(generateClient().aplicationMaster).getOneById(id);
  };

  getOneAndParent = async (id: number) => {
    return await new BaseRepo(
      generateClient().aplicationMaster
    ).getOneByIdWithParam(id, {
      include: {
        classification: true,
      },
    });
  };
  count = async () => {
    return await new BaseRepo(generateClient().aplicationMaster).count();
  };

  // const getOneAndChildren = async (id: number, child: string) => {
  //   return await new BaseRepo(generateClient().aplicationMaster).getOneByIdWithParam(id, {
  //     include: {
  //       [child]: true,
  //     },
  //   });
  // };

  // const getOneAndChildAndParent = async (id: number) => {
  //   return await new BaseRepo(generateClient().aplicationMaster).getOneByIdWithParam(id, {
  //     include: {
  //       [child]: true,
  //       [parent]: true,
  //     },
  //   });
  // };

  insert = async (payload: AplicationMasterPostIF) => {
    return await new BaseRepo(generateClient().aplicationMaster).insert(
      payload
    );
  };

  insertMany = async (animals: AplicationMasterPostIF[]) => {
    return await new BaseRepo(generateClient().aplicationMaster).insertMany(
      animals
    );
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: AplicationMasterPostIF;
  }) => {
    return await new BaseRepo(generateClient().aplicationMaster).updateById({
      id,
      payload,
    });
  };

  updateManyById = async (updates: AplicationMasterPostIF[]) => {
    return await new BaseRepo(generateClient().aplicationMaster).updateManyById(
      updates
    );
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(generateClient().aplicationMaster).deleteById(id);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(generateClient().aplicationMaster).deleteManyById(
      ids
    );
  };
  safetyDeleteById = async (id: number) => {
    return await new BaseRepo(
      generateClient().aplicationMaster
    ).safetyDeleteById(id);
  };
}

export default new AplicationMasterRepo();
