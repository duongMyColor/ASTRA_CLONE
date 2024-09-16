import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FileBody, MultipartUploadBody } from '@repo/types/upload';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware
import {
  createMultipartUpload,
  deleteObject,
  resumeMultipartUpload,
} from '@/lib/cloudflare-r2';
import { BadRequestError } from '@/app/api/_core/error.response';
import { convertFormDataToObject } from '@repo/utils/objectUtils';

export const POST = errorHandlerMiddleware(
  async (
    request: NextRequest,
    { params: { action } }: { params: { action: string } }
  ) => {
    const { key, uploadId, parts }: MultipartUploadBody = await request.json();
    // Route the request based on the HTTP method and action type
    switch (action) {
      case 'mpu-create': {
        return new NextResponse(
          JSON.stringify(await createMultipartUpload(key))
        );
      }
      case 'mpu-complete': {
        if (uploadId === null) {
          return new BadRequestError('Missing uploadId');
        }

        const multipartUpload = await resumeMultipartUpload({ key, uploadId });

        if (parts === null) {
          return new BadRequestError('Missing or incomplete parts');
        }

        // Error handling in case the multipart upload does not exist anymore
        try {
          const object = await multipartUpload.complete(
            parts as R2UploadedPart[]
          );
          return new NextResponse(null, {
            headers: {
              etag: object.httpEtag,
            },
          });
        } catch (error: any) {
          return new BadRequestError(error.message);
        }
      }
      default:
        return new BadRequestError(`Unknown action ${action} for POST`);
    }
  }
);

export const PUT = errorHandlerMiddleware(
  async (
    request: NextRequest,
    { params: { action } }: { params: { action: string } }
  ) => {
    const body = await request.formData();
    const bodyObj = convertFormDataToObject(body);
    // Destructure the body object

    if (
      !('key' in bodyObj) ||
      !('uploadId' in bodyObj) ||
      !('partNumberString' in bodyObj) ||
      !('part' in bodyObj)
    ) {
      throw new BadRequestError('Missing required multipart upload fields');
    }

    const { key, uploadId, partNumberString, part } = bodyObj;

    switch (action) {
      case 'mpu-uploadpart': {
        if (partNumberString === null || uploadId === null) {
          return new BadRequestError('Missing partNumber or uploadId');
        }
        if (part === null) {
          return new BadRequestError('Missing request body');
        }

        const partNumber = parseInt(partNumberString as string, 10);

        const multipartUpload = await resumeMultipartUpload({ key, uploadId });

        try {
          const uploadedPart: R2UploadedPart = await multipartUpload.uploadPart(
            partNumber,
            part as FileBody
          );
          return new NextResponse(JSON.stringify(uploadedPart));
        } catch (error: any) {
          return new BadRequestError(error.message);
        }
      }
      default:
        return new BadRequestError(`Unknown action ${action} for PUT`);
    }
  }
);

export const DELETE = errorHandlerMiddleware(
  async (
    request: NextRequest,
    { params: { action } }: { params: { action: string } }
  ) => {
    const { key, uploadId }: MultipartUploadBody = await request.json();

    switch (action) {
      case 'mpu-abort': {
        if (uploadId === null) {
          return new BadRequestError('Missing uploadId');
        }
        const multipartUpload = await resumeMultipartUpload({ key, uploadId });

        try {
          multipartUpload.abort();
        } catch (error: any) {
          return new BadRequestError(error.message);
        }
        return new NextResponse(null, { status: 204 });
      }
      case 'delete': {
        await deleteObject(key);
        return new NextResponse(null, { status: 204 });
      }
      default:
        return new BadRequestError(`Unknown action ${action} for DELETE`);
    }
  }
);

export const runtime = 'edge';
