import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import userController from '../_controllers/user.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await userController.getAllWithQuery(request));
  // return NextResponse.json(await userController.getAll());
});

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  console.log('request', request);

  return NextResponse.json(await userController.create(request));
});

export const runtime = 'edge';
