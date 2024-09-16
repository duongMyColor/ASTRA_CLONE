import TermOfUseService from '../_services/termOfUse.service';
import { OK, CREATED } from '../_core/success.response';

import { TermOfUsePostIF } from '@repo/types/termOfUse';
import TermsOfUseRepo from '../_repos/termOfUse.repo';
import type { NextRequest } from 'next/server';
import { parseParams, parseSearchParams } from '@repo/utils/parseParams';

class TeamOfUseController {
  create = async (request: NextRequest) => {
    const payload: FormData = await request.formData();

    return new CREATED({
      message: 'created Term Of Use OK!',
      metadata: await TermOfUseService.create({
        payload: payload,
      }),
    });
  };

  createMany = async (request: NextRequest) => {
    const payload: TermOfUsePostIF[] = await request.json();

    return new CREATED({
      message: 'created batch Term Of Use OK!',
      metadata: await TermOfUseService.createMany(payload),
    });
  };

  getAll = async () => {
    return new OK({
      message: 'get all Term Of Use success!',
      metadata: await TermOfUseService.getAll(),
      count: await TermsOfUseRepo.count(),
    });
  };

  getManyReference = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const params = parseParams(searchParams);

    return new OK({
      message: 'get all Term Of Use success!',
      metadata: await TermOfUseService.getManyReference(params),
    });
  };

  getAllWithQuery = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const { filter, range, sort } = parseSearchParams(searchParams);

    return new OK({
      message: 'get all Term Of Use success!',
      metadata: await TermOfUseService.getAllWithQuery({
        filter,
        range,
        sort,
      }),
      count: await TermsOfUseRepo.count(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get Term Of Use success!',
      metadata: await TermOfUseService.getOneById(id),
    });
  };

  update = async (request: NextRequest, id: number) => {
    const payload: FormData = await request.formData();

    return new OK({
      message: 'updated Term Of Use OK!',
      metadata: await TermOfUseService.updateById({
        id: id,
        payload: payload,
      }),
    });
  };

  updateMany = async (request: NextRequest) => {
    const payload: TermOfUsePostIF[] = await request.json();

    return new OK({
      message: 'updated batch Term Of Use OK!',
      metadata: await TermOfUseService.updateMany(payload),
    });
  };

  delete = async (id: number) => {
    return new OK({
      message: 'deleted Term Of Use OK!',
      metadata: await TermOfUseService.deleteById(id),
    });
  };

  deleteMany = async (request: NextRequest) => {
    const payload: number[] = await request.json();

    return new OK({
      message: 'deleted batch Term Of Use OK!',
      metadata: await TermOfUseService.deleteManyById(payload),
    });
  };
}

const termOfUseController = new TeamOfUseController();
export default termOfUseController;
