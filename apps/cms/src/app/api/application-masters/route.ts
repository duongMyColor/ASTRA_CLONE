import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import aplicationMasterController from '../_controllers/applicationMaster.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await aplicationMasterController.getAllWithQuery(request)
  );
});

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await aplicationMasterController.create(request));
});

export const runtime = 'edge';
