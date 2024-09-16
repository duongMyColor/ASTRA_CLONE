import { ModelDeligate, RecordValue } from '@repo/types/general';

class BaseRepo {
  private tableModel: ModelDeligate;

  constructor(tableModel: ModelDeligate) {
    this.tableModel = tableModel;
  }

  getAll = async () => {
    return await this.tableModel.findMany();
  };

  getAllActive = async () => {
    return await this.tableModel.findMany({
      where: {
        isDeleted: false,
      },
    });
  };

  getAllAndChild = async (child: string, select: any = {}) => {
    return await this.tableModel.findMany({
      include: {
        [child]: true,
      },
    });
  };

  getOneByIdAndChildren = async (id: number, child: string) => {
    const res = await this.tableModel.findUnique({
      where: {
        id: id,
      },
      include: {
        [child]: true,
      },
    });

    return res;
  };

  getOneById = async (id: number) => {
    const res = await this.tableModel.findUnique({
      where: {
        id: id,
      },
    });

    return res;
  };
  getActiveRecordById = async (id: number) => {
    const res = await this.tableModel.findUnique({
      where: {
        id: id,
        isDeleted: false,
      },
    });

    return res;
  };

  getOneByCondition = async (condition: RecordValue, select = {}) => {
    return await this.tableModel.findFirst({
      where: condition,
    });
  };

  getManyByIds = async (ids: number[]) => {
    return await this.tableModel.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  };

  getManyActiveRecordByIds = async (ids: number[]) => {
    return await this.tableModel.findMany({
      where: {
        id: {
          in: ids,
        },
        isDeleted: false,
      },
    });
  };

  getManyAndChildrenByIds = async (ids: number[], child: string) => {
    return await this.tableModel.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        [child]: true,
      },
    });
  };

  getUpdated = async (
    lastSyncDate: Date | string,
    include: RecordValue = {}
  ) => {
    return await this.tableModel.findMany({
      where: {
        updatedAt: {
          gt: lastSyncDate,
        },
      },
      include: include,
    });
  };
}

export { BaseRepo };
