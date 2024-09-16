import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import acstaController from '../../../_controllers/acsta.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const PUT = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    return NextResponse.json(await acstaController.updateScanData(request, id));
  }
);
export const runtime = 'edge';
