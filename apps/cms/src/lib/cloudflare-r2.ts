import { getRequestContext } from '@cloudflare/next-on-pages';
import { MultipartUploadBody } from '@repo/types/upload';

interface Env extends CloudflareEnv {
  BUCKET: R2Bucket;
}

// const env = getRequestContext().env as Env;
const getBucket = () => {
  const env = getRequestContext().env as Env;
  const BUCKET = env.BUCKET;
  return BUCKET;
};

export const putObject = async (key: string, body: any) => {
  const BUCKET = getBucket();
  await BUCKET.put(key, body);
  return key;
};

export const getObject = async (key: string) => {
  const BUCKET = getBucket();

  const object = await BUCKET.get(key);

  return object;
};

export const createMultipartUpload = async (key: string) => {
  const BUCKET = getBucket();

  const multipartUpload = await BUCKET.createMultipartUpload(key);

  return {
    key: multipartUpload.key,
    uploadId: multipartUpload.uploadId,
  };
};

export const resumeMultipartUpload = async ({
  key,
  uploadId,
}: MultipartUploadBody) => {
  const BUCKET = getBucket();

  return BUCKET.resumeMultipartUpload(key, uploadId);
};

export const deleteObject = async (key: string) => {
  const BUCKET = getBucket();

  return BUCKET.delete(key);
};

export const uploadObjectMultipart = (file: File, keyPrefix: string) => {};
