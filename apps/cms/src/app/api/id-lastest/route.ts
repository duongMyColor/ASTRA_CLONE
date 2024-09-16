import errorHandlerMiddleware from '@/middlewares/errorHandler';
import idLastestController from '../_controllers/idLastest.controller';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import messages from '@bicstone/ra-language-japanese';

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await idLastestController.getOneByIdLastest(request)
  );
});
export const runtime = 'edge';
