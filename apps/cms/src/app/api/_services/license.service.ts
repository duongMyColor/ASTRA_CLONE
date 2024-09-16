import { LicensePostIF } from '@repo/types/license';
import LicenseRepo from '../_repos/license.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';

import { convertFormDataToObject } from '@repo/utils/objectUtils';
import { UPLOAD_FOLDER_MAP } from '@repo/consts/general';
import UploadFileService from './upload.service';

class LicenseFactory {
  static async create({ payload }: { payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);

    const body = await new UploadFileService().uploadFile(
      paylodObj as LicensePostIF,
      UPLOAD_FOLDER_MAP.license
    );

    return await new License(body).create();
  }

  static async createMany(body: LicensePostIF[]) {
    const payload = body.map(
      (terms_and_conditions) => new License(terms_and_conditions)
    );
    return await LicenseRepo.insertMany(payload);
  }

  static async getOneById(id: number) {
    return await LicenseRepo.getOneById(id);
  }

  static async getAll() {
    return await LicenseRepo.getAll();
  }

  static async getAllWithQuery({ filter, range, sort }: GetAllQueryIF) {
    return await LicenseRepo.getAllWithQuery({ filter, range, sort });
  }

  static async getAllWithFilters({ filter, range, sort }: GetAllQueryIF) {
    return await LicenseRepo.getAllWithFilters({ filter, range, sort });
  }

  static async getManyReference(params: GetManyReferenceParams) {
    return await LicenseRepo.getManyReference(params);
  }

  static async updateById({ id, payload }: { id: number; payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);

    const body = await new UploadFileService().uploadFile(
      paylodObj as LicensePostIF,
      UPLOAD_FOLDER_MAP.license
    );

    return await new License(body).updateById({ id });
  }

  static async updateMany(updates: LicensePostIF[]) {
    const payload = updates.map((update) => new License(update));

    return await LicenseRepo.updateManyById(payload);
  }

  static async deleteById(id: number) {
    return await LicenseRepo.deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await LicenseRepo.deleteManyById(ids);
  }
}

class License implements LicensePostIF {
  public id?: number;
  public memo: string | number | null;
  public version: number;
  public content: string;
  public publishedDate: string | Date;
  public updatedAt: string;
  public record?: string;

  public constructor({
    version,
    content,
    memo,
    publishedDate,
    record,
  }: LicensePostIF) {
    this.version = version;
    this.content = content as string;
    this.memo = memo ? memo.toString() : null;
    this.publishedDate = new Date(publishedDate).toISOString();
    this.updatedAt = new Date().toISOString();
    this.record = record;
  }

  public async create() {
    const payload: LicensePostIF = this;
    return await LicenseRepo.insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: LicensePostIF = this;
    return await LicenseRepo.updateById({ id, payload });
  }
}

export default LicenseFactory;
