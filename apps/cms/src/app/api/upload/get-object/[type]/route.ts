import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware
import { getObject } from '@/lib/cloudflare-r2';
import { NotFoundError } from '@/app/api/_core/error.response';
import { convertReadableStreamToBase64 } from '@repo/utils/fileUtils';

export const POST = errorHandlerMiddleware(
  async (
    request: NextRequest,
    { params: { type } }: { params: { type: string } }
  ) => {
    const req: { key: string } = await request.json();
    const object = await getObject(req?.key);

    if (object === null) {
      return new NotFoundError('Object Not Found');
    }

    const headers = new Headers();
    // object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);

    switch (type) {
      case 'image':
        return new Response(await convertReadableStreamToBase64(object.body), {
          headers,
        });

      case 'text-file':
        return new Response(object.body, {
          headers,
        });
      default:
        return new NotFoundError('Unsupported type');
    }
  }
);

export const runtime = 'edge';
