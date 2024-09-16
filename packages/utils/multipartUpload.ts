import dayjs from 'dayjs';
import dataProvider from '../../apps/cms/src/providers/dataProviders/dataProvider';
import { UPLOAD_FOLDER_MAP } from '@repo/consts/general';
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB in bytes

interface UploadedPart {
  ETag: string;
  PartNumber: number;
}

export const createMultipartUpload = async (key: string) => {
  const {
    data: {
      json: { key: resKey, uploadId },
    },
  } = await dataProvider.multipartUpload('POST', 'mpu-create', {
    key,
  });

  return { resKey, uploadId };
};

export const uploadParts = async (
  file: File,
  resKey: string,
  uploadId: string
) => {
  let promises = [];
  const MAX_RETRIES = 3; // define the maximum number of retries

  for (let i = 0; i < file.size; i += CHUNK_SIZE) {
    const chunk = file.slice(i, i + CHUNK_SIZE);
    const partNumber = i / CHUNK_SIZE + 1;

    let attempt = 0;
    while (attempt < MAX_RETRIES) {
      try {
        promises.push(
          dataProvider.multipartUpload('PUT', 'mpu-uploadpart', {
            body: {
              key: resKey,
              uploadId,
              partNumberString: partNumber.toString(),
              part: chunk,
            },
          })
        );
        break; // if the upload is successful, break the loop
      } catch (error) {
        if (attempt === MAX_RETRIES - 1) throw error; // if this was the last attempt, throw the error
        attempt++; // otherwise, increment the attempt counter and try again
      }
    }
  }

  const results = await Promise.all(promises);

  let parts: UploadedPart[] = [];

  results.forEach((result) => {
    const {
      data: { json: uploadedPart },
    } = result;

    parts.push(uploadedPart);
  });

  return parts;
};

export const completeMultipartUpload = async (
  resKey: string,
  uploadId: string,
  parts: UploadedPart[]
) => {
  await dataProvider.multipartUpload('POST', 'mpu-complete', {
    key: resKey,
    uploadId,
    parts,
  });
};

export const uploadMuiltpart = async (file: File) => {
  try {
    const timestamp = dayjs().format('YYYYMMDD_HHmmssSSS');
    const key = `${UPLOAD_FOLDER_MAP.applicationMaster}/${timestamp}/${file.name}`;

    const { resKey, uploadId } = await createMultipartUpload(key);

    const parts = await uploadParts(file, resKey, uploadId);

    await completeMultipartUpload(resKey, uploadId, parts);

    return key;
  } catch (error) {
    console.error('Error during multipart upload:', error);
  }
};
