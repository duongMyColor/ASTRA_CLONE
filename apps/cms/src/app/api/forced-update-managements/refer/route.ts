import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import animalController from '../../_controllers/termOfUse.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await animalController.getManyReference(request));
});

export const runtime = 'edge';
