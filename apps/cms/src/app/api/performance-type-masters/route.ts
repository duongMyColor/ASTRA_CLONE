import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import performanceMasterController from '../_controllers/performanceTypeMaster.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await performanceMasterController.getAllPerformanceTypeMaster(request)
  );
});

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await performanceMasterController.create(request));
});

export const runtime = 'edge';
