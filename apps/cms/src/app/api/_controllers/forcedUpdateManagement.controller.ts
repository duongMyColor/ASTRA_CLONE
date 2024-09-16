import ForcedUpdateManagementService from '../_services/forcedUpdateManagement.service';
import { OK, CREATED } from '../_core/success.response';

import { ForcedUpdateManagementPostIF } from '@repo/types/forceUpdateManagement';
import ForcedUpdateRepo from '../_repos/forcedUpdateManagement.repo';
import type { NextRequest } from 'next/server';
import { parseParams, parseSearchParams } from '@repo/utils/parseParams';

class ForcedUpdateManagementController {
  create = async (request: NextRequest) => {
    const payload: FormData = await request.formData();

    return new CREATED({
      message: 'created Term Of Use OK!',
      metadata: await ForcedUpdateManagementService.create({
        payload: payload,
      }),
    });
  };

  createMany = async (request: NextRequest) => {
    const payload: ForcedUpdateManagementPostIF[] = await request.json();

    return new CREATED({
      message: 'created batch Term Of Use OK!',
      metadata: await ForcedUpdateManagementService.createMany(payload),
    });
  };

  getAll = async () => {
    return new OK({
      message: 'get all Term Of Use success!',
      metadata: await ForcedUpdateManagementService.getAll(),
      count: await ForcedUpdateRepo.count(),
    });
  };

  getManyReference = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const params = parseParams(searchParams);

    return new OK({
      message: 'get all Term Of Use success!',
      metadata: await ForcedUpdateManagementService.getManyReference(params),
    });
  };

  getAllWithQuery = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const { filter, range, sort } = parseSearchParams(searchParams);

    return new OK({
      message: 'get all Term Of Use success!',
      metadata: await ForcedUpdateManagementService.getAllWithQuery({
        filter,
        range,
        sort,
      }),
      count: await ForcedUpdateRepo.count(),
    });
  };
  getAllAndParentWithFilters = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const { filter, range, sort } = parseSearchParams(searchParams);

    return new OK({
      message: 'get all Acsta success!',
      metadata: await ForcedUpdateManagementService.getAllAndParentWithFilters({
        filter,
        range,
        sort,
      }),
      count: await ForcedUpdateRepo.count(),
    });
  };

  getAllParen = async () => {
    return new OK({
      message: 'get all forced for update success!',
      metadata: await ForcedUpdateManagementService.getAllParen(),
      count: await ForcedUpdateRepo.count(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get Term Of Use success!',
      metadata: await ForcedUpdateManagementService.getOneById(id),
    });
  };

  update = async (request: NextRequest, id: number) => {
    const payload: FormData = await request.formData();

    return new OK({
      message: 'updated Term Of Use OK!',
      metadata: await ForcedUpdateManagementService.updateById({
        id: id,
        payload: payload,
      }),
    });
  };
  getOneAndChildAndParent = async (id: number) => {
    return new OK({
      message: 'get AplicationMaster success!',
      metadata: await ForcedUpdateManagementService.getOneAndParent(id),
    });
  };

  updateMany = async (request: NextRequest) => {
    const payload: ForcedUpdateManagementPostIF[] = await request.json();

    return new OK({
      message: 'updated batch Term Of Use OK!',
      metadata: await ForcedUpdateManagementService.updateMany(payload),
    });
  };

  delete = async (id: number) => {
    return new OK({
      message: 'deleted Term Of Use OK!',
      metadata: await ForcedUpdateManagementService.deleteById(id),
    });
  };

  deleteMany = async (request: NextRequest) => {
    const payload: number[] = await request.json();

    return new OK({
      message: 'deleted batch Term Of Use OK!',
      metadata: await ForcedUpdateManagementService.deleteManyById(payload),
    });
  };
}

const forcedUpdateManagementController = new ForcedUpdateManagementController();
export default forcedUpdateManagementController;
