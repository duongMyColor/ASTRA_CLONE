import statusCodes from '@/app/api/_core/statusCodes';
// import { logger } from '@repo/lib/logger';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface ErrorIF {
  status?: number;
  message: string;
  stack: string;
}

function errorHandlerMiddleware(fn: Function) {
  return async function (request: NextRequest, ...args: any) {
    try {
      return await fn(request, ...args);
    } catch (error: ErrorIF | any) {
      const status = error.status ?? statusCodes.INTERNAL_SERVER_ERROR;

      return NextResponse.json(
        {
          message: error.message,
          code: status,
        },
        {
          status: status,
        }
      );
    }
  };
}

export default errorHandlerMiddleware;
