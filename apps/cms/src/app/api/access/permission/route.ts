import errorHandlerMiddleware from '@/middlewares/errorHandler';
import { NextRequest, NextResponse } from 'next/server';
import userController from '../../_controllers/user.controller';

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await userController.getPermission());
});

export const runtime = 'edge';
