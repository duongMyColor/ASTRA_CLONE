import PerformanceService from '../_services/performance.service';
import { OK, CREATED } from '../_core/success.response';

import { PerformancePostIF } from '@repo/types/performance';
import type { NextRequest } from 'next/server';
import { parseSearchParams } from '@repo/utils/parseParams';
import PerfromanceRepo from '../_repos/performance.repo';

class PerformanceController {
  create = async (request: NextRequest) => {
    const payload: FormData = await request.formData();

    return new CREATED({
      message: 'created Performance OK!',
      metadata: await PerformanceService.create({
        payload: payload,
      }),
    });
  };

  createMany = async (request: NextRequest) => {
    const payload: PerformancePostIF[] = await request.json();

    return new CREATED({
      message: 'created batch Performance OK!',
      metadata: await PerformanceService.createMany(payload),
    });
  };

  getAll = async () => {
    return new OK({
      message: 'get all Users success!',
      metadata: await PerformanceService.getAll(),
    });
  };
  getAllWithQuery = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const { filter, range, sort } = parseSearchParams(searchParams);

    return new OK({
      message: 'get all Acsta success!',
      metadata: await PerformanceService.getAllWithQuery({
        filter,
        range,
        sort,
      }),
      count: await PerfromanceRepo.count(),
    });
  };


  getAllAndParent = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const { filter, range, sort } = parseSearchParams(searchParams);

    return new OK({
      message: 'get all Acsta success!',
      metadata: await PerformanceService.getAllAndParent({
        filter,
        range,
        sort,
      }),
      count: await PerfromanceRepo.count(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get User success!',
      metadata: await PerformanceService.getOneById(id),
    });
  };
  getOneAndChildAndParent = async (id: number) => {
    return new OK({
      message: 'get AplicationMaster success!',
      metadata: await PerformanceService.getOneAndParent(id),
    });
  };

  update = async (request: NextRequest, id: number) => {
    console.log('update controler');
    const payload: FormData = await request.formData();

    return new OK({
      message: 'updated Performance OK!',
      metadata: await PerformanceService.updateById({
        id: id,
        payload: payload,
      }),
    });
  };

  updateMany = async (request: NextRequest) => {
    const payload: PerformancePostIF[] = await request.json();

    return new OK({
      message: 'updated batch Performance OK!',
      metadata: await PerformanceService.updateMany(payload),
    });
  };

  delete = async (id: number) => {
    return new OK({
      message: 'deleted Performance OK!',
      metadata: await PerformanceService.deleteById(id),
    });
  };

  deleteMany = async (request: NextRequest) => {
    const payload: number[] = await request.json();

    return new OK({
      message: 'deleted batch Performance OK!',
      metadata: await PerformanceService.deleteManyById(payload),
    });
  };
}

const performanceController = new PerformanceController();
export default performanceController;
