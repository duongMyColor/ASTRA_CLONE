import { ForcedUpdateManagementPostIF } from '@repo/types/forceUpdateManagement';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import { generateClient } from '@/lib/prisma';

class ForcedUpdateRepo {
  getAll = async () => {
    return await new BaseRepo(generateClient().forcedUpdateManagement).getAll();
  };
  getAllParen = async () => {
    return await new BaseRepo(
      generateClient().forcedUpdateManagement
    ).getAllParen({
      include: {
        aplicationMaster: true,
      },
    });
  };

  count = async () => {
    return await new BaseRepo(
      generateClient().forcedUpdateManagement
    ).countAll();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(
      generateClient().forcedUpdateManagement
    ).getAllWithQuery({ sort, range, filter });
  };
  getAllWithFilters = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(
      generateClient().forcedUpdateManagement
    ).getAllWithFilters({ sort, range, filter });
  };
  getAllAndParentWithFilters = async ({
    sort,
    range,
    filter,
  }: GetAllQueryIF) => {
    return await new BaseRepo(
      generateClient().forcedUpdateManagement
    ).getAllWithParmForceUpdate({
      sort,
      range,
      filter,
      include: {
        aplicationMaster: true,
      },
    });
  };

  getManyReference = async (params: GetManyReferenceParams) => {
    return new BaseRepo(
      generateClient().forcedUpdateManagement
    ).getManyReference(params);
  };

  getOneById = async (id: number) => {
    return await new BaseRepo(
      generateClient().forcedUpdateManagement
    ).getOneById(id);
  };
  getOneAndParent = async (id: number) => {
    return await new BaseRepo(
      generateClient().forcedUpdateManagement
    ).getOneByIdWithParam(id, {
      include: {
        aplicationMaster: true,
      },
    });
  };

  insert = async (payload: ForcedUpdateManagementPostIF) => {
    await new BaseRepo(
      generateClient().idLastestOfRecord
    ).updateIdLastestOfRecord({
      record: payload.record,
    });
    delete payload.record;
    return await new BaseRepo(generateClient().forcedUpdateManagement).insert(
      payload
    );
  };

  insertMany = async (body: ForcedUpdateManagementPostIF[]) => {
    return await new BaseRepo(
      generateClient().forcedUpdateManagement
    ).insertMany(body);
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: ForcedUpdateManagementPostIF;
  }) => {
    return await new BaseRepo(
      generateClient().forcedUpdateManagement
    ).updateById({
      id,
      payload,
    });
  };

  updateManyById = async (updates: ForcedUpdateManagementPostIF[]) => {
    return await new BaseRepo(
      generateClient().forcedUpdateManagement
    ).updateManyById(updates);
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(
      generateClient().forcedUpdateManagement
    ).deleteById(id);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(
      generateClient().forcedUpdateManagement
    ).deleteManyById(ids);
  };
}
export default new ForcedUpdateRepo();
