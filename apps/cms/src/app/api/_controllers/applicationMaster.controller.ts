import AplicationMasterService from '../_services/applicationMaster.sercvice';
import { OK, CREATED } from '../_core/success.response';

import { AplicationMasterPostIF } from '@repo/types/applicationMaster';
import type { NextRequest } from 'next/server';
import { parseParams, parseSearchParams } from '@repo/utils/parseParams';
import applicationMasterRepo from '../_repos/applicationMaster.repo';

class AplicationMasterController {
  create = async (request: NextRequest) => {
    const payload: FormData = await request.formData();

    return new CREATED({
      message: 'created AplicationMaster OK!',
      metadata: await AplicationMasterService.create({
        payload: payload,
      }),
    });
  };

  createMany = async (request: NextRequest) => {
    const payload: AplicationMasterPostIF[] = await request.json();

    return new CREATED({
      message: 'created batch AplicationMaster OK!',
      metadata: await AplicationMasterService.createMany(payload),
    });
  };

  getAll = async () => {
    return new OK({
      message: 'get all AplicationMasters success!',
      metadata: await AplicationMasterService.getAll(),
    });
  };

  getManyReference = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const params = parseParams(searchParams);

    return new OK({
      message: 'get all AplicationMasters success!',
      metadata: await AplicationMasterService.getManyReference(params),
    });
  };

  getAllWithQuery = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const { filter, range, sort } = parseSearchParams(searchParams);

    return new OK({
      message: 'get all AplicationMasters success!',
      metadata: await AplicationMasterService.getAllWithQuery({
        filter,
        range,
        sort,
      }),
      count: await applicationMasterRepo.count(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get AplicationMaster success!',
      metadata: await AplicationMasterService.getOneById(id),
    });
  };

  // getOneAndChildAndParent = async (id: number) => {
  //   return new OK({
  //     message: 'get AplicationMaster success!',
  //     metadata: await AplicationMasterService.getOneAndChildAndParent(id),
  //   });
  // };

  update = async (request: NextRequest, id: number) => {
    const payload: FormData = await request.formData();

    return new OK({
      message: 'updated AplicationMaster OK!',
      metadata: await AplicationMasterService.updateById({
        id: id,
        payload: payload,
      }),
    });
  };

  updateMany = async (request: NextRequest) => {
    const payload: AplicationMasterPostIF[] = await request.json();

    return new OK({
      message: 'updated batch AplicationMaster OK!',
      metadata: await AplicationMasterService.updateMany(payload),
    });
  };

  delete = async (id: number) => {
    return new OK({
      message: 'deleted AplicationMaster OK!',
      metadata: await AplicationMasterService.safetyDeleteById(id),
    });
  };

  deleteMany = async (request: NextRequest) => {
    const payload: number[] = await request.json();

    return new OK({
      message: 'deleted batch AplicationMaster OK!',
      metadata: await AplicationMasterService.deleteManyById(payload),
    });
  };
}

const applicationMasterController = new AplicationMasterController();
export default applicationMasterController;
