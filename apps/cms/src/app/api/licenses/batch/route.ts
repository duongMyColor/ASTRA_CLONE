import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import licenseController from '../../_controllers/license.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await licenseController.createMany(request));
});

export const PUT = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await licenseController.updateMany(request));
});

export const DELETE = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await licenseController.deleteMany(request));
});

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await licenseController.getAll());
});

export const runtime = 'edge';
