import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import performanceController from '../../_controllers/performance.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await performanceController.createMany(request));
});

export const PUT = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await performanceController.updateMany(request));
});

export const DELETE = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await performanceController.deleteMany(request));
});
export const GET = errorHandlerMiddleware(async () => {
  return NextResponse.json(await performanceController.getAll());
});

export const runtime = 'edge';
