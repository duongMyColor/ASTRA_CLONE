import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import forcedUpdateManagementController from '../_controllers/forcedUpdateManagement.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await forcedUpdateManagementController.getAllAndParentWithFilters(request)
  );
});

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await forcedUpdateManagementController.create(request)
  );
});

export const runtime = 'edge';
