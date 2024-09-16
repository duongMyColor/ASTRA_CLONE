import AcstaService from '../_services/acsta.service';
import { OK, CREATED } from '../_core/success.response';

import { AcstaPostIF } from '@repo/types/acsta';
import AcstaRepo from '../_repos/acsta.repo';
import type { NextRequest } from 'next/server';
import { parseParams, parseSearchParams } from '@repo/utils/parseParams';
import { RectData } from '@repo/types/rectangleEditor';

class AcstaController {
  create = async (request: NextRequest) => {
    const payload: FormData = await request.formData();

    console.log('payload', payload);

    return new CREATED({
      message: 'created Acsta OK!',
      metadata: await AcstaService.create({
        payload: payload,
      }),
    });
  };

  createMany = async (request: NextRequest) => {
    const payload: AcstaPostIF[] = await request.json();

    return new CREATED({
      message: 'created batch Acsta OK!',
      metadata: await AcstaService.createMany(payload),
    });
  };

  getAll = async () => {
    return new OK({
      message: 'get all Acsta success!',
      metadata: await AcstaService.getAll(),
      count: await AcstaRepo.count(),
    });
  };

  getManyReference = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const params = parseParams(searchParams);

    return new OK({
      message: 'get all Acsta success!',
      metadata: await AcstaService.getManyReference(params),
    });
  };

  getAllWithQuery = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const { filter, range, sort } = parseSearchParams(searchParams);

    return new OK({
      message: 'get all Acsta success!',
      metadata: await AcstaService.getAllWithQuery({
        filter,
        range,
        sort,
      }),
      count: await AcstaRepo.count(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get Acsta success!',
      metadata: await AcstaService.getOneById(id),
    });
  };

  getOneAndChildAndParent = async (id: number) => {
    return new OK({
      message: 'get AplicationMaster success!',
      metadata: await AcstaService.getOneAndParent(id),
    });
  };

  update = async (request: NextRequest, id: number) => {
    const payload: FormData = await request.formData();

    return new OK({
      message: 'updated Acsta OK!',
      metadata: await AcstaService.updateById({
        id: id,
        payload: payload,
      }),
    });
  };

  updateScanData = async (request: NextRequest, id: number) => {
    const payload: RectData = await request.json();

    return new OK({
      message: 'updated Acsta scan data OK!',
      metadata: await AcstaService.updateScanDataById({
        id: id,
        payload: payload,
      }),
    });
  };

  updateMany = async (request: NextRequest) => {
    const payload: AcstaPostIF[] = await request.json();

    return new OK({
      message: 'updated batch Acsta OK!',
      metadata: await AcstaService.updateMany(payload),
    });
  };

  delete = async (id: number) => {
    return new OK({
      message: 'deleted Acsta OK!',
      metadata: await AcstaService.deleteById(id),
    });
  };

  deleteMany = async (request: NextRequest) => {
    const payload: number[] = await request.json();

    return new OK({
      message: 'deleted batch Acsta OK!',
      metadata: await AcstaService.deleteManyById(payload),
    });
  };
}

const acstaController = new AcstaController();
export default acstaController;
