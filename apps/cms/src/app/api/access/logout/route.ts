import errorHandlerMiddleware from '@/middlewares/errorHandler';
import { NextRequest, NextResponse } from 'next/server';
import accessController from '../../_controllers/access.controller';

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await accessController.logout());
});

export const runtime = 'edge';
