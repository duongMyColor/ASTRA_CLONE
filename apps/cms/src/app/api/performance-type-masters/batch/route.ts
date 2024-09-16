import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import performanceMasterController from '../../_controllers/performanceTypeMaster.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const DELETE = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await performanceMasterController.deleteMany(request)
  );
});

export const GET = errorHandlerMiddleware(async () => {
  return NextResponse.json(await performanceMasterController.getAll());
});


export const runtime = 'edge';
