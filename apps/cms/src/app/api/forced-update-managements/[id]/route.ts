import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import forcedUpdateManagementController from '../../_controllers/forcedUpdateManagement.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const GET = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    return NextResponse.json(
      await forcedUpdateManagementController.getOneAndChildAndParent(id)
    );
  }
);

export const PUT = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    return NextResponse.json(
      await forcedUpdateManagementController.update(request, id)
    );
  }
);

export const DELETE = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    return NextResponse.json(await forcedUpdateManagementController.delete(id));
  }
);

export const runtime = 'edge';
