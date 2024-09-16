import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import aplicationMasterController from '../../_controllers/applicationMaster.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await aplicationMasterController.createMany(request)
  );
});

export const PUT = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await aplicationMasterController.updateMany(request)
  );
});

export const DELETE = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await aplicationMasterController.deleteMany(request)
  );
});

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await aplicationMasterController.getAll());
});

export const runtime = 'edge';
