import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import BootUpdateRepo from '@/app/api/_repos/bootUpdate.repo';
import { MAP_RESOURE } from '@repo/consts/general';

const setResponseHeaders = (response: NextResponse) => {
  response.headers.set('Access-Control-Expose-Headers', 'Content-Range');
  response.headers.set('Content-Range', 'users 0-10/10');
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE'
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
};

const isValidMethod = (method: string) =>
  ['POST', 'PUT', 'DELETE'].includes(method);

const getValidPath = (path: string) => {
  const validPaths = [
    'acstas',
    'performances',
    'application-masters',
    'term-of-uses',
    'licenses',
  ];
  return validPaths.find((validPath) => path.includes(validPath));
};

const baseMiddleware = async (request: NextRequest) => {
  const response = NextResponse.next();
  setResponseHeaders(response);

  if (!isValidMethod(request.method)) {
    return response;
  }

  const validPath = getValidPath(request.nextUrl.pathname);
  if (!validPath) {
    return response;
  }

  const tableName = MAP_RESOURE[validPath];
  if (!tableName) {
    return response;
  }

  console.log('tableName', tableName);

  if (response.status === 200) {
    await BootUpdateRepo.updateByTableName(tableName);
  } else {
    console.log('Response was not successful');
  }

  return response;
};

export default baseMiddleware;
