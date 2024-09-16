import { TermOfUsePostIF } from '@repo/types/termOfUse';
import { generateClient } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';

class LicenseRepo {
  getAll = async () => {
    return await new BaseRepo(generateClient().license).getAll();
  };

  count = async () => {
    return await new BaseRepo(generateClient().license).countAll();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(generateClient().license).getAllWithQuery({
      sort,
      range,
      filter,
    });
  };
  getAllWithFilters = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(generateClient().license).getAllWithFilters({
      sort,
      range,
      filter,
    });
  };

  getManyReference = async (params: GetManyReferenceParams) => {
    return new BaseRepo(generateClient().license).getManyReference(params);
  };

  getOneById = async (id: number) => {
    return await new BaseRepo(generateClient().license).getOneById(id);
  };

  insert = async (payload: TermOfUsePostIF) => {
    await new BaseRepo(
      generateClient().idLastestOfRecord
    ).updateIdLastestOfRecord({
      record: payload.record,
    });
    delete payload.record;
    return await new BaseRepo(generateClient().license).insert(payload);
  };

  insertMany = async (body: TermOfUsePostIF[]) => {
    return await new BaseRepo(generateClient().license).insertMany(body);
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: TermOfUsePostIF;
  }) => {
    return await new BaseRepo(generateClient().license).updateById({
      id,
      payload,
    });
  };

  updateManyById = async (updates: TermOfUsePostIF[]) => {
    return await new BaseRepo(generateClient().license).updateManyById(updates);
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(generateClient().license).deleteById(id);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(generateClient().license).deleteManyById(ids);
  };
}

export default new LicenseRepo();
