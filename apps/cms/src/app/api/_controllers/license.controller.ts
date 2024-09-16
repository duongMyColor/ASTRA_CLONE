import LicenseService from '../_services/license.service';
import { OK, CREATED } from '../_core/success.response';
import LicenseRepo from '../_repos/license.repo';

import { LicensePostIF } from '@repo/types/license';
import type { NextRequest } from 'next/server';
import { parseParams, parseSearchParams } from '@repo/utils/parseParams';

class LicenseController {
  create = async (request: NextRequest) => {
    const payload: FormData = await request.formData();
    console.log({ payload });

    return new CREATED({
      message: 'created License OK!',
      metadata: await LicenseService.create({
        payload: payload,
      }),
    });
  };

  createMany = async (request: NextRequest) => {
    const payload: LicensePostIF[] = await request.json();

    return new CREATED({
      message: 'created batch License OK!',
      metadata: await LicenseService.createMany(payload),
    });
  };

  getAll = async () => {
    return new OK({
      message: 'get all License success!',
      metadata: await LicenseService.getAll(),
      count: await LicenseRepo.count(),
    });
  };

  getManyReference = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const params = parseParams(searchParams);

    return new OK({
      message: 'get all License success!',
      metadata: await LicenseService.getManyReference(params),
    });
  };

  getAllWithQuery = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const { filter, range, sort } = parseSearchParams(searchParams);

    return new OK({
      message: 'get all License success!',
      metadata: await LicenseService.getAllWithQuery({
        filter,
        range,
        sort,
      }),
      count: await LicenseRepo.count(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get License success!',
      metadata: await LicenseService.getOneById(id),
    });
  };

  update = async (request: NextRequest, id: number) => {
    const payload: FormData = await request.formData();

    return new OK({
      message: 'updated License OK!',
      metadata: await LicenseService.updateById({
        id: id,
        payload: payload,
      }),
    });
  };

  updateMany = async (request: NextRequest) => {
    const payload: LicensePostIF[] = await request.json();

    return new OK({
      message: 'updated batch License OK!',
      metadata: await LicenseService.updateMany(payload),
    });
  };

  delete = async (id: number) => {
    return new OK({
      message: 'deleted License OK!',
      metadata: await LicenseService.deleteById(id),
    });
  };

  deleteMany = async (request: NextRequest) => {
    const payload: number[] = await request.json();

    return new OK({
      message: 'deleted batch License OK!',
      metadata: await LicenseService.deleteManyById(payload),
    });
  };
}

const licenseController = new LicenseController();
export default licenseController;
