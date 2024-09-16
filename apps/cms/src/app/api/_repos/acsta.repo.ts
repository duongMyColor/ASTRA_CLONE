import { AcstaPostIF } from '@repo/types/acsta';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import { generateClient } from '@/lib/prisma';

class AcstaRepo {
  getAll = async () => {
    return await new BaseRepo(generateClient().acstaManagement).getAllActive();
  };

  count = async () => {
    return await new BaseRepo(generateClient().acstaManagement).count();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(
      generateClient().acstaManagement
    ).getAllWithFilter({
      sort,
      range,
      filter,
    });
  };
  getAllWithFilters = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(
      generateClient().acstaManagement
    ).getAllWithFilters({
      sort,
      range,
      filter,
    });
  };
  getOneAndParent = async (id: number) => {
    return await new BaseRepo(
      generateClient().acstaManagement
    ).getOneByIdWithParam(id, {
      include: {
        application: true,
      },
    });
  };

  getManyReference = async (params: GetManyReferenceParams) => {
    return new BaseRepo(generateClient().acstaManagement).getManyReference(
      params
    );
  };

  getOneById = async (id: number) => {
    return await new BaseRepo(generateClient().acstaManagement).getOneById(id);
  };

  insert = async (payload: AcstaPostIF) => {
    await new BaseRepo(
      generateClient().idLastestOfRecord
    ).updateIdLastestOfRecord({
      record: payload.record,
    });
    delete payload.record;
    return await new BaseRepo(generateClient().acstaManagement).insert(payload);
  };

  insertMany = async (body: AcstaPostIF[]) => {
    return await new BaseRepo(generateClient().acstaManagement).insertMany(
      body
    );
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: AcstaPostIF | any;
  }) => {
    if (!payload.scanColors) {
      payload.scanColors = null;
      payload.scanHeight = null;
      payload.scanOriginX = null;
      payload.scanOriginY = null;
      payload.scanWidth = null;
    }
    return await new BaseRepo(generateClient().acstaManagement).updateByIdAcsta(
      {
        id,
        payload,
      }
    );
  };

  updateManyById = async (updates: AcstaPostIF[]) => {
    return await new BaseRepo(generateClient().acstaManagement).updateManyById(
      updates
    );
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(
      generateClient().acstaManagement
    ).safetyDeleteAstraById(id);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(generateClient().acstaManagement).deleteManyById(
      ids
    );
  };
}

export default new AcstaRepo();
