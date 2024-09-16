import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import userController from '../../_controllers/user.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const DELETE = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await userController.deleteMany(request));
});

export const runtime = 'edge';
