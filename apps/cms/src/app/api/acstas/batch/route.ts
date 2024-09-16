import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import acstaController from '../../_controllers/acsta.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await acstaController.createMany(request));
});

export const PUT = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await acstaController.updateMany(request));
});

export const DELETE = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await acstaController.deleteMany(request));
});

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await acstaController.getAll());
});

export const runtime = 'edge';
