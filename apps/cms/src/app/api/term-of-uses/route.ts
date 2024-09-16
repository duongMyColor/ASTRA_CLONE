import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import termOfUseController from '../_controllers/termOfUse.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await termOfUseController.getAllWithQuery(request));
});

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await termOfUseController.create(request));
});

export const runtime = 'edge';
