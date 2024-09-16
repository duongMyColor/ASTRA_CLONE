import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import licenseController from '../../_controllers/license.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await licenseController.getManyReference(request));
});

export const runtime = 'edge';
