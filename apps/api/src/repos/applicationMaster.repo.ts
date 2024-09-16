import { getDb } from '@/lib/globalObject';
import { BaseRepo } from './base/base.repo';

export const getAll = async () => {
  const prisma = getDb();

  return await new BaseRepo(prisma.aplicationMaster).getAllActive();
};

export const getOneById = async (id: number) => {
  const prisma = getDb();

  return await new BaseRepo(prisma.aplicationMaster).getActiveRecordById(id);
};

export const getManyByIds = async (ids: number[]) => {
  const prisma = getDb();

  return await new BaseRepo(prisma.aplicationMaster).getManyActiveRecordByIds(
    ids
  );
};

export const getUpdateData = async (
  lastSyncDate: Date | string,
  bundleId: string
) => {
  const prisma = getDb();

  return await prisma.aplicationMaster.findFirst({
    where: {
      updatedAt: {
        gt: lastSyncDate,
      },
      packageName: bundleId,
      isDeleted: false,
    },
    include: {
      license: {
        select: {
          content: true,
        },
      },
      termOfUse: {
        select: {
          content: true,
        },
      },
    },
  });
};

export const getOneByBundleId = async (bundleId: string) => {
  const prisma = getDb();

  return await prisma.aplicationMaster.findFirst({
    where: {
      packageName: bundleId,
      isDeleted: false,
    },
    include: {
      license: {
        select: {
          content: true,
        },
      },
      termOfUse: {
        select: {
          content: true,
        },
      },
    },
  });
};
