import { UserIF } from '@repo/types/user';
import { generateClient } from '@/lib/prisma';
import { exclude } from '@repo/utils/excludeKey';
import { BaseRepo } from './base/base.repo';

class BootUpdateRepo {
  getAll = async () => {
    const res = (await new BaseRepo(generateClient().bootUpdate).getAll()).map(
      (user: UserIF) => exclude(user, ['password'])
    );

    return res;
  };

  count = async () => {
    return await new BaseRepo(generateClient().bootUpdate).count();
  };

  insertMany = async (users: UserIF[]) => {
    return await new BaseRepo(generateClient().bootUpdate).insertMany(users);
  };

  updateById = async ({ id }: { id: number }) => {
    return await new BaseRepo(generateClient().bootUpdate).updateById({
      id,
      payload: { updateAt: new Date() },
    });
  };

  updateByTableName = async (tableName: string) => {
    return await generateClient().bootUpdate.update({
      where: {
        tableName: tableName,
      },
      data: { updatedAt: new Date() },
    });
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(generateClient().bootUpdate).deleteById(id);
  };
}

export default new BootUpdateRepo();
