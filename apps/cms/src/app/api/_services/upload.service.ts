import { deleteObject, putObject } from '@/lib/cloudflare-r2';

class UploadFileService {
  public async deleteFile(key: string) {
    return await deleteObject(key);
  }

  public async uploadFile(object: any, keyPrefix: string) {
    for (const key in object) {
      if (typeof object[key] == 'object') {
        const file = object[key];
        const fileName = file?.name;
        const timestamp = new Date().getTime();
        const objKey = `${keyPrefix}/${timestamp}/${fileName}`;
        const buffer = await file.arrayBuffer();

        object[key] = await putObject(objKey, buffer);
      }
    }

    return object;
  }
}

export default UploadFileService;
