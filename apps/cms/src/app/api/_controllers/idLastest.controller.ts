import { OK } from '../_core/success.response';
import type { NextRequest } from 'next/server';
import { BaseRepo } from '../_repos/base/base.repo';
import { generateClient } from '@/lib/prisma';

class IdLastestController {
  getOneByIdLastest = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    let typeSource = searchParams.get('source') as any;
    const model = generateClient()[typeSource];
    if (!model) {
      throw new Error('Model not found');
    }

    return new OK({
      message: `get ${typeSource} success!`,
      metadata: await new BaseRepo(model).getOneByIdLastest(),
    });
  };
}

const idLastestController = new IdLastestController();
export default idLastestController;
