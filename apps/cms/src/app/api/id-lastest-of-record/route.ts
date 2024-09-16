import { generateClient } from '@/lib/prisma';
import errorHandlerMiddleware from '@/middlewares/errorHandler';
import { NextRequest, NextResponse } from 'next/server';
import { OK } from '../_core/success.response';
import { BaseRepo } from '../_repos/base/base.repo';

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  let recordName = searchParams.get('record') as any;
  const model = generateClient().idLastestOfRecord;
  return NextResponse.json(
    new OK({
      message: `get id lastest ${recordName} success!`,
      metadata: await new BaseRepo(model).getOneByIdLastestRecord(recordName),
    })
  );
});

export const runtime = 'edge';
