import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import userController from '../../_controllers/user.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  console.log({ searchParams });
  const email = searchParams.get('email') as any;
 
  console.log({ email });
  return NextResponse.json(await userController.getOneByEmail(email));
});

export const runtime = 'edge';
