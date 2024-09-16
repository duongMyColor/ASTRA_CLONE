import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import termOfuseController from '../../_controllers/termOfUse.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await termOfuseController.createMany(request));
});

export const PUT = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await termOfuseController.updateMany(request));
});

export const DELETE = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await termOfuseController.deleteMany(request));
});

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await termOfuseController.getAll());
});

export const runtime = 'edge';
