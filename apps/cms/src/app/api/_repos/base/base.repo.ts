import { generateClient } from '@/lib/prisma';
import { ModelDeligate, RecordValue } from '@repo/types/general';
import { GetAllQueryIF } from '@repo/types/response';
import removeEmptyProperties from '@repo/utils/removeEmptyProperties';
import { GetManyReferenceParams, GetManyReferenceResult } from 'react-admin';
import { sortData } from '@repo/utils/sortData';
import { STATUS_APP_MASTER, TypeStatusAppMaster } from '@repo/consts/product';
import UploadFileService from '../../_services/upload.service';
import { AcstaApiResponseIF } from '@repo/types/acsta';
import { PerformanceApiResponseIF } from '@repo/types/performance';
import { NameCheckType } from '@repo/types/applicationMaster';
import { INVERSER_ORDER } from '@repo/consts/general';

class BaseRepo {
  private tableModel: ModelDeligate;

  constructor(tableModel: ModelDeligate) {
    this.tableModel = tableModel;
  }

  countAll = async () => {
    return await this.tableModel.count();
  };
  count = async () => {
    return await this.tableModel.count({
      where: {
        isDeleted: false,
      },
    });
  };

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
  getAllParen = async ({ include }: RecordValue) => {
    return await this.tableModel.findMany({ include });
  };
  constructOrderByClause = (sortField: string, sortOrder: string) => {
    return [
      {
        [String(sortField) === 'no' ||
        String(sortField) === 'status' ||
        String(sortField) === 'scanColors'
          ? 'id'
          : String(sortField)]: sortOrder?.toLowerCase() ?? '',
      },
      { id: sortOrder?.toLowerCase() },
    ];
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    const [sortField, sortOrder] = sort;
    const [start, end] = range;
    console.log(':::filter getAllWithQuery', filter);

    const whereClause = Object.fromEntries(
      Object.entries(filter).map(([key, value]) => [
        key,
        {
          search: (value as string)
            .trim()
            .split(' ')
            .map((word: string) => `${word} ${word}*`.toLowerCase())
            .join(' '),
        },
      ])
    );

    const res = await this.tableModel.findMany({
      orderBy: this.constructOrderByClause(
        sortField as string,
        sortOrder as string
      ),
      skip: start ?? 0,
      take: (end ?? 0) - (start ?? 0) + 1,
      where: whereClause,
    });

    const data = sortData(res);

    return data;
  };


  getAllWithParm = async ({ sort, range, filter, include }: GetAllQueryIF) => {
    const [sortField, sortOrder] = sort;
    const [start, end] = range;
    console.log(':::filter getAllWithQuery', filter);

    const statusActive = filter.isDeleted;
    const isDeleted =
      STATUS_APP_MASTER[statusActive as keyof TypeStatusAppMaster] ?? false;
    delete filter.isDeleted;

    const whereClause = Object.fromEntries(
      Object.entries(filter).map(([key, value]) => [
        key,
        {
          search: (value as string)
            .trim()
            .split(' ')
            .map((word: string) => `${word} ${word}*`.toLowerCase())
            .join(' '),
        },
      ])
    );

    const res = await this.tableModel.findMany({
      orderBy: this.constructOrderByClause(
        sortField as string,
        sortOrder as string
      ),
      skip: start ?? 0,
      take: (end ?? 0) - (start ?? 0) + 1,
      where: { ...whereClause, isDeleted: isDeleted },
      include,
    });

    const data = sortData(res);
    return data;
  };

  getAllWithParmForceUpdate = async ({
    sort,
    range,
    filter,
    include,
  }: GetAllQueryIF) => {
    const [sortField, sortOrder] = sort;
    const [start, end] = range;
    console.log(':::filter getAllWithQuery', filter);

    const whereClause = Object.fromEntries(
      Object.entries(filter).map(([key, value]) => [
        key,
        {
          search: (value as string)
            .trim()
            .split(' ')
            .map((word: string) => `${word} ${word}*`.toLowerCase())
            .join(' '),
        },
      ])
    );

    const res = await this.tableModel.findMany({
      orderBy: this.constructOrderByClause(
        sortField as string,
        sortOrder as string
      ),
      skip: start ?? 0,
      take: (end ?? 0) - (start ?? 0) + 1,
      where: { ...whereClause },
      include,
    });

    const data = sortData(res);
    return data;
  };

  getAllPerformanceTypeMaster = async ({
    sort,
    range,
    filter,
  }: GetAllQueryIF) => {
    const [sortField, sortOrder] = sort;
    const [start, end] = range;

    const whereClause = Object.fromEntries(
      Object.entries(filter).map(([key, value]) => [
        key,
        {
          search: (value as string)
            .trim()
            .split(' ')
            .map((word: string) => `${word} ${word}*`.toLowerCase())
            .join(' '),
        },
      ])
    );

    let res = await this.tableModel.findMany({
      orderBy: this.constructOrderByClause(
        sortField as string,
        sortOrder as string
      ),
      skip: start ?? 0,
      take: (end ?? 0) - (start ?? 0) + 1,
      where: whereClause,
    });

    for (let i = 0; i < res.length; i++) {
      const queryOne = await this.getOneByIdPerformaceTypeMaster(res[i].id);

      if (queryOne) {
        res[i]['isExist'] = true;
      } else {
        res[i]['isExist'] = false;
      }
    }

    const data = sortData(res);

    return data;
  };

  getOneByIdPerformaceTypeMaster = async (idPerformanceTypeMaster: number) => {
    const prisma = generateClient();

    const response = await prisma.performaceManagement.findFirst({
      where: {
        performanceTypeMasterId: idPerformanceTypeMaster,
        isDeleted: false,
      },
    });

    return response;
  };
  getOneByName = async (nameCheck: NameCheckType) => {
    const response = await this.tableModel.findFirst({
      where: { ...nameCheck, isDeleted: false },
    });

    return response;
  };

  getAllWithFilters = async ({ sort, range, filter }: GetAllQueryIF) => {
    const [sortField, sortOrder] = sort;
    const [start, end] = range;
    console.log(':::filter getAllWithFilters', filter);
    let whereClause = {} as any;

    if (filter.classificationId) {
      whereClause.classificationId = filter.classificationId;
    }

    whereClause.created = {};

    if (filter.createdFrom) {
      whereClause.created.gte = new Date(filter.createdFrom);
    }

    if (filter.createdTo) {
      whereClause.created.lte = new Date(filter.createdTo);
    }

    if (!filter.createdFrom && !filter.createdTo) {
      delete whereClause.created;
    }

    const res = await this.tableModel.findMany({
      orderBy: this.constructOrderByClause(
        sortField as string,
        sortOrder as string
      ),
      skip: start ?? 0,
      take: (end ?? 0) - (start ?? 0) + 1,
      where: whereClause,
    });

    return res;
  };

  getManyReference = async (
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult> => {
    const { target, id, pagination, sort, filter } = params;
    const { page, perPage } = pagination;
    const { field, order } = sort;

    const whereClause = { ...filter, [target]: id };
    const skip = (page - 1) * perPage;
    const take = perPage;

    const data = await this.tableModel.findMany({
      where: whereClause,
      orderBy: { [field]: order.toLowerCase() },
      skip,
      take,
    });

    const total = await this.tableModel.count({ where: whereClause });

    return {
      data,
      total,
      pageInfo: {
        hasNextPage: page * perPage < total,
        hasPreviousPage: page > 1,
      },
    };
  };

  getAllWithQueryAndSafety = async ({ sort, range, filter }: GetAllQueryIF) => {
    const [sortField, sortOrder] = sort;
    const [start, end] = range;

    const whereClause = Object.fromEntries(
      Object.entries(filter).map(([key, value]) => [
        key,
        {
          search: (value as string)
            .trim()
            .split(' ')
            .map((word: string) => `${word} ${word}*`.toLowerCase())
            .join(' '),
        },
      ])
    );

    const res = await this.tableModel.findMany({
      orderBy: this.constructOrderByClause(
        sortField as string,
        sortOrder as string
      ),
      skip: start ?? 0,
      take: (end ?? 0) - (start ?? 0) + 1,
      where: { ...whereClause, isDeleted: false },
    });

    const data = sortData(res);

    return data;
  };

  getAllWithFilter = async ({ sort, range, filter }: GetAllQueryIF) => {
    const [sortField, sortOrder] = sort;
    const [start, end] = range;
    console.log(':::filter getAllWithQuery', filter);

    const statusActive = filter.isDeleted;
    const isDeleted =
      STATUS_APP_MASTER[statusActive as keyof TypeStatusAppMaster] ?? false;
    delete filter.isDeleted;

    const whereClause = Object.fromEntries(
      Object.entries(filter).map(([key, value]) => [
        key,
        {
          search: (value as string)
            .trim()
            .split(' ')
            .map((word: string) => `${word} ${word}*`.toLowerCase())
            .join(' '),
        },
      ])
    );

    const res = await this.tableModel.findMany({
      orderBy: this.constructOrderByClause(
        sortField as string,
        sortOrder as string
      ),
      skip: start ?? 0,
      take: (end ?? 0) - (start ?? 0) + 1,
      where: { ...whereClause, isDeleted: isDeleted },
    });

    const data = sortData(res);

    return data;
  };

  getOneById = (id: number) => {
    const res = this.tableModel.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  };
  getOneByIdHaveIsDeleted = (id: number) => {
    const res = this.tableModel.findFirst({
      where: {
        id: id,
        isDeleted: false,
      },
    });
    return res;
  };

  getOneWithParam = (params: RecordValue) => {
    const res = this.tableModel.findFirst({
      ...params,
    });
    return res;
  };

  getOneByIdWithParam = (id: number, params: RecordValue) => {
    const res = this.tableModel.findUnique({
      where: {
        id,
      },
      ...params,
    });
    return res;
  };
  getOneByIdLastest = async () => {
    try {
      const res = await this.tableModel.findMany({
        orderBy: {
          id: 'desc',
        },
        take: 1,
      });

      return res;
    } catch (error) {
      const notFind = [{ id: 0 }];

      console.log({ error });
      return notFind;
    }
  };

  getOneByIdLastestRecord = async (nameRecord: string) => {
    try {
      const latestRecord = await this.tableModel.findFirst({
        where: { name: nameRecord },
      });

      return latestRecord;
    } catch (error) {
      console.log({ error });
    }
  };

  insert = async (payload: RecordValue) => {
    const data = removeEmptyProperties(payload);
    return await this.tableModel.create({
      data,
    });
  };

  insertMany = async (items: RecordValue[]) => {
    const operations = items.map((item: RecordValue) => {
      const data = removeEmptyProperties(item);

      return this.tableModel.create({ data });
    });

    const prisma = generateClient();
    return await prisma.$transaction(operations);
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: RecordValue;
  }) => {
    const data = removeEmptyProperties(payload);
    console.log(':::data', data);

    return await this.tableModel.update({
      where: {
        id: id,
      },
      data,
    });
  };
  updateByIdAcsta = async ({
    id,
    payload,
  }: {
    id: number;
    payload: RecordValue;
  }) => {
    const data = payload;

    return await this.tableModel.update({
      where: {
        id: id,
      },
      data,
    });
  };

  updateManyById = async (updates: RecordValue[]) => {
    const operations = updates.map((update) => {
      const { id, ...data } = update;

      const updateContent = removeEmptyProperties(data);

      return this.tableModel.update({
        where: { id },
        data: updateContent,
      });
    });
    const prisma = generateClient();

    return await prisma.$transaction(operations);
  };
  updateIdLastestOfRecord = async (record: RecordValue) => {
    const data = removeEmptyProperties(record);
    const findData = await this.tableModel.findFirst({
      where: { name: data.record },
    });
    if (!findData) {
      throw new Error('Record not found');
    }

    const updateData = await this.tableModel.update({
      where: { id: findData.id },
      data: { idLastest: findData.idLastest + 1 },
    });

    return updateData;
  };

  deleteById = async (id: number) => {
    return await this.tableModel.delete({
      where: {
        id: id,
      },
    });
  };

  findManyById = async (table: ModelDeligate, key: string, id: number) => {
    return await table.findMany({
      where: {
        [key]: id,
        isDeleted: false,
      },
    });
  };

  findOneById = async (table: ModelDeligate, key: string, id: number) => {
    return await table.findFirst({
      where: {
        [key]: id,
        isDeleted: false,
      },
    });
  };

  updateStatusDelete = async (
    table: ModelDeligate,
    key: string,
    id: number
  ) => {
    await table.updateMany({
      where: {
        [key]: id,
      },
      data: {
        isDeleted: true,
      },
    });
  };

  safetyDeleteById = async (id: number) => {
    const tableAstra = generateClient().acstaManagement;
    const tablePerformance = generateClient().performaceManagement;
    const [resAstra, resAppMaster] = await Promise.all([
      this.findManyById(tableAstra, 'applicationId', id),
      this.findOneById(this.tableModel, 'id', id),
    ]);

    if (resAstra.length > 0) {
      await this.updateStatusDelete(tableAstra, 'applicationId', id);

      const fileUrlsToDelete = [
        ...resAstra.flatMap(
          (record: { thumbnailUrl: string; scanImageUrl: string }) => [
            record.thumbnailUrl,
            record.scanImageUrl,
          ]
        ),
        resAppMaster.assetBundleIOS,
        resAppMaster.assetBundleAndroid,
      ].filter(Boolean);

      await Promise.all(
        fileUrlsToDelete.map((url) => new UploadFileService().deleteFile(url))
      );

      const acstaIds = resAstra.map((record: AcstaApiResponseIF) => record.id);

      const resPerformance: PerformanceApiResponseIF[] =
        await tablePerformance.findMany({
          where: { acstaId: { in: acstaIds } },
        });

      if (resPerformance.length > 0) {
        await tablePerformance.updateMany({
          where: { acstaId: { in: acstaIds } },
          data: { isDeleted: true },
        });
        const performanceFileUrlsToDelete = [
          ...resPerformance.flatMap((item) => [
            item.assetBundleIOS,
            item.assetBundleAndroid,
          ]),
        ].filter(Boolean);

        await Promise.all(
          performanceFileUrlsToDelete.map((url) =>
            new UploadFileService().deleteFile(url)
          )
        );
      }
    }

    const deleteAppMaster = await this.tableModel.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
      },
    });
    await new UploadFileService().deleteFile(resAppMaster.assetBundleIOS);
    await new UploadFileService().deleteFile(resAppMaster.assetBundleAndroid);
    return deleteAppMaster;
  };

  safetyDeletePerformById = async (id: number) => {
    const resPerformance = await this.findOneById(this.tableModel, 'id', id);
    const deletePerfrom = await this.tableModel.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
      },
    });

    await new UploadFileService().deleteFile(resPerformance.assetBundleIOS);
    await new UploadFileService().deleteFile(resPerformance.assetBundleAndroid);

    return deletePerfrom;
  };

  safetyDeleteAstraById = async (id: number) => {
    const tablePerformance = generateClient().performaceManagement;
    const [resPerform, resAcsta] = await Promise.all([
      this.findManyById(tablePerformance, 'acstaId', id),
      this.findOneById(this.tableModel, 'id', id),
    ]);

    console.log({ resPerform });

    if (resPerform.length > 0) {
      await this.updateStatusDelete(
        tablePerformance,
        'acstaId',
        resPerform[0].acstaId
      );

      for (let i = 0; i < resPerform.length; i++) {
        await new UploadFileService().deleteFile(resPerform[i].assetBundleIOS);
        await new UploadFileService().deleteFile(
          resPerform[i].assetBundleAndroid
        );
      }
    }

    const deleteAsta = await this.tableModel.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
      },
    });
    await new UploadFileService().deleteFile(resAcsta.thumbnailUrl);
    await new UploadFileService().deleteFile(resAcsta.scanImageUrl);

    return deleteAsta;
  };

  deleteWithRelation = async (id: number, relationFieldName: string) => {
    // await this.tableModel.update({
    //   where: {
    //     id: id,
    //   },
    //   data: {
    //     [relationFieldName]: {
    //       deleteMany: {},
    //     },
    //   },
    //   include: {
    //     [relationFieldName]: true,
    //   },
    // });

    return await this.tableModel.delete({
      where: {
        id: id,
      },
    });
  };

  deleteManyById = async (ids: number[]) => {
    const operations = ids.map((id) =>
      this.tableModel.delete({
        where: { id },
      })
    );
    const prisma = generateClient();

    return await prisma.$transaction(operations);
  };

  safetyDeleteManyById = async (ids: number[]) => {
    const operations = ids.map((id) =>
      this.tableModel.update({
        where: { id },
        data: {
          isDeleted: true,
        },
      })
    );
    const prisma = generateClient();

    return await prisma.$transaction(operations);
  };
}

export { BaseRepo };
