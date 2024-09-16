export type FileBody =
  | ArrayBuffer
  | ReadableStream
  | ArrayBufferView
  | string
  | Blob;

export interface MultipartUploadBody {
  [key: string]: any;
  key: string;
  uploadId: string;
  partNumberString?: string;
  parts?: R2UploadedPart[];
  part?: FileBody;
}

export type MultipartUploadActions =
  | 'mpu-create'
  | 'mpu-complete'
  | 'mpu-uploadpart'
  | 'mpu-abort'
  | 'delete';

export type MultipartUploadAllowMethods = 'POST' | 'PUT' | 'DELETE' | 'GET';
