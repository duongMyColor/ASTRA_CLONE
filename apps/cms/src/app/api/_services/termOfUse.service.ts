import { TermOfUsePostIF } from '@repo/types/termOfUse';
import TermsOfUseRepo from '../_repos/termOfUse.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import { convertFormDataToObject } from '@repo/utils/objectUtils';
import { UPLOAD_FOLDER_MAP } from '@repo/consts/general';
import UploadFileService from './upload.service';

class TermOfUseFactory {
  static async create({ payload }: { payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);

    const body = await new UploadFileService().uploadFile(
      paylodObj as TermOfUsePostIF,
      UPLOAD_FOLDER_MAP.termOfUse
    );

    return await new TermOfUse(body).create();
  }

  static async createMany(body: TermOfUsePostIF[]) {
    const payload = body.map(
      (terms_and_conditions) => new TermOfUse(terms_and_conditions)
    );
    return await TermsOfUseRepo.insertMany(payload);
  }

  static async getOneById(id: number) {
    return await TermsOfUseRepo.getOneById(id);
  }

  static async getAll() {
    return await TermsOfUseRepo.getAll();
  }

  static async getAllWithQuery({ filter, range, sort }: GetAllQueryIF) {
    return await TermsOfUseRepo.getAllWithQuery({ filter, range, sort });
  }

  static async getAllWithFilters({ filter, range, sort }: GetAllQueryIF) {
    return await TermsOfUseRepo.getAllWithFilters({ filter, range, sort });
  }

  static async getManyReference(params: GetManyReferenceParams) {
    return await TermsOfUseRepo.getManyReference(params);
  }

  static async updateById({ id, payload }: { id: number; payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);

    const body = await new UploadFileService().uploadFile(
      paylodObj as TermOfUsePostIF,
      UPLOAD_FOLDER_MAP.termOfUse
    );

    return await new TermOfUse(body).updateById({ id });
  }

  static async updateMany(updates: TermOfUsePostIF[]) {
    const payload = updates.map((update) => new TermOfUse(update));

    return await TermsOfUseRepo.updateManyById(payload);
  }

  static async deleteById(id: number) {
    return await TermsOfUseRepo.deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await TermsOfUseRepo.deleteManyById(ids);
  }
}

class TermOfUse implements TermOfUsePostIF {
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
  }: TermOfUsePostIF) {
    this.version = version;
    this.content = content as string;
    this.memo = memo ? memo.toString() : null;

    this.publishedDate = new Date(publishedDate).toISOString();
    this.updatedAt = new Date().toISOString();
    this.record = record;
  }

  public async create() {
    const payload: TermOfUsePostIF = this;
    return await TermsOfUseRepo.insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: TermOfUsePostIF = this;
    return await TermsOfUseRepo.updateById({ id, payload });
  }
}

export default TermOfUseFactory;
