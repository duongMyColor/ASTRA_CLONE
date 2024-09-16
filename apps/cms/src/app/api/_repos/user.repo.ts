import { UserIF } from '@repo/types/user';
import { generateClient } from '@/lib/prisma';
import { exclude } from '@repo/utils/excludeKey';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { RecordValue } from '@repo/types/general';

class UserRepo {
  getAll = async () => {
    const res = (await new BaseRepo(generateClient().user).getAll()).map(
      (user: UserIF) => exclude(user, ['password'])
    );

    return res;
  };

  count = async () => {
    return await new BaseRepo(generateClient().user).count();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    const res = (
      await new BaseRepo(generateClient().user).getAllWithQueryAndSafety({
        sort,
        range,
        filter,
      })
    ).map((user: UserIF) => exclude(user, ['password']));

    return res;
  };

  getOneById = async (id: number) => {
    const res = exclude(
      await new BaseRepo(generateClient().user).getOneByIdHaveIsDeleted(id),
      ['password']
    );

    return res;
  };

  getOneWithParam = async (params: RecordValue) => {
    const res = await new BaseRepo(generateClient().user).getOneWithParam(
      params
    );
    return res;
  };

  getPermission = async (userId: number) => {
    const res = await generateClient().user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    return res;
  };

  insert = async (payload: UserIF) => {
    return await new BaseRepo(generateClient().user).insert(payload);
  };

  insertMany = async (users: UserIF[]) => {
    return await new BaseRepo(generateClient().user).insertMany(users);
  };

  updateManyById = async (updates: { id: number; data: UserIF }[]) => {
    return await new BaseRepo(generateClient().user).updateManyById(updates);
  };

  updateLastLogin = async ({ id }: { id: number }) => {
    return await new BaseRepo(generateClient().user).updateById({
      id,
      payload: { lastLogin: new Date() },
    });
  };

  updateById = async ({ id, payload }: { id: number; payload: UserIF }) => {
    return await new BaseRepo(generateClient().user).updateById({
      id,
      payload,
    });
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(generateClient().user).deleteById(id);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(generateClient().user).deleteManyById(ids);
  };

  safetyDeleteById = async (id: number) => {
    return await new BaseRepo(generateClient().user).safetyDeleteById(id);
  };

  safetyDeleteManyById = async (ids: number[]) => {
    return await new BaseRepo(generateClient().user).safetyDeleteManyById(ids);
  };
}

export default new UserRepo();
