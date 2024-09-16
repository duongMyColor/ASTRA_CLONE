import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import aplicationMasterController from '../../_controllers/applicationMaster.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';
import { BaseRepo } from '../../_repos/base/base.repo';
import { generateClient } from '@/lib/prisma';
import { OK } from '../../_core/success.response';
import { NameCheckType } from '@repo/types/applicationMaster';

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  let packageName = searchParams.get('packageName') as string;
  let appName = searchParams.get('appName') as string;

  const nameCheck: NameCheckType = packageName ? { packageName } : { appName };

  const model = generateClient().aplicationMaster;
  return NextResponse.json(
    new OK({
      message: `get ${packageName ? 'packageName' : 'appName'}  success!`,
      metadata: await new BaseRepo(model).getOneByName(nameCheck),
    })
  );
});

export const runtime = 'edge';
// new BaseRepo(model).insert(payload);vc
