import { TermOfUsePostIF } from '@repo/types/termOfUse';
import { generateClient } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';

class TermsOfUseRepo {
  getAll = async () => {
    return await new BaseRepo(generateClient().termsOfUse).getAll();
  };

  count = async () => {
    return await new BaseRepo(generateClient().termsOfUse).countAll();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(generateClient().termsOfUse).getAllWithQuery({
      sort,
      range,
      filter,
    });
  };
  getAllWithFilters = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(generateClient().termsOfUse).getAllWithFilters({
      sort,
      range,
      filter,
    });
  };

  getManyReference = async (params: GetManyReferenceParams) => {
    return new BaseRepo(generateClient().termsOfUse).getManyReference(params);
  };

  getOneById = async (id: number) => {
    return await new BaseRepo(generateClient().termsOfUse).getOneById(id);
  };

  insert = async (payload: TermOfUsePostIF) => {
    await new BaseRepo(
      generateClient().idLastestOfRecord
    ).updateIdLastestOfRecord({
      record: payload.record,
    });
    delete payload.record;
    return await new BaseRepo(generateClient().termsOfUse).insert(payload);
  };

  insertMany = async (body: TermOfUsePostIF[]) => {
    return await new BaseRepo(generateClient().termsOfUse).insertMany(body);
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: TermOfUsePostIF;
  }) => {
    return await new BaseRepo(generateClient().termsOfUse).updateById({
      id,
      payload,
    });
  };

  updateManyById = async (updates: TermOfUsePostIF[]) => {
    return await new BaseRepo(generateClient().termsOfUse).updateManyById(
      updates
    );
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(generateClient().termsOfUse).deleteById(id);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(generateClient().termsOfUse).deleteManyById(ids);
  };
}

export default new TermsOfUseRepo();
