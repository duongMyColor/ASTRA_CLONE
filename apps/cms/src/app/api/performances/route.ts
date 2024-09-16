import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import performanceController from '../_controllers/performance.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await performanceController.getAllAndParent(request)
  );
});
export const PUT = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    return NextResponse.json(await performanceController.update(request, id));
  }
);

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await performanceController.create(request));
});

export const runtime = 'edge';
