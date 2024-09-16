import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import forcedUpdateManagementController from '../../_controllers/forcedUpdateManagement.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await forcedUpdateManagementController.createMany(request)
  );
});

export const PUT = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await forcedUpdateManagementController.updateMany(request)
  );
});

export const DELETE = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await forcedUpdateManagementController.deleteMany(request)
  );
});

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await forcedUpdateManagementController.getAllParen());
});

export const runtime = 'edge';
