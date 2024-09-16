import { ForcedUpdateManagementPostIF } from '@repo/types/forceUpdateManagement';
import ForcedUpdateRepo from '../_repos/forcedUpdateManagement.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import { convertFormDataToObject } from '@repo/utils/objectUtils';
import { UPLOAD_FOLDER_MAP } from '@repo/consts/general';
import UploadFileService from './upload.service';

class ForcedUpdateManagementFactory {
  static async create({ payload }: { payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);
    return await new ForcedUpdateManagement(
      paylodObj as ForcedUpdateManagementPostIF
    ).create();
  }

  static async createMany(body: ForcedUpdateManagementPostIF[]) {
    const payload = body.map(
      (terms_and_conditions) => new ForcedUpdateManagement(terms_and_conditions)
    );
    return await ForcedUpdateRepo.insertMany(payload);
  }

  static async getOneById(id: number) {
    return await ForcedUpdateRepo.getOneById(id);
  }
  static async getOneAndParent(id: number) {
    return await await ForcedUpdateRepo.getOneAndParent(id);
  }

  static async getAll() {
    return await ForcedUpdateRepo.getAll();
  }

  static async getAllParen() {
    return await ForcedUpdateRepo.getAllParen();
  }

  static async getAllWithQuery({ filter, range, sort }: GetAllQueryIF) {
    return await ForcedUpdateRepo.getAllWithQuery({ filter, range, sort });
  }

  static async getAllWithFilters({ filter, range, sort }: GetAllQueryIF) {
    return await ForcedUpdateRepo.getAllWithFilters({ filter, range, sort });
  }
  static async getAllAndParentWithFilters({
    filter,
    range,
    sort,
  }: GetAllQueryIF) {
    return await await ForcedUpdateRepo.getAllAndParentWithFilters({
      filter,
      range,
      sort,
    });
  }

  static async getManyReference(params: GetManyReferenceParams) {
    return await ForcedUpdateRepo.getManyReference(params);
  }

  static async updateById({ id, payload }: { id: number; payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);

    const body = await new UploadFileService().uploadFile(
      paylodObj as ForcedUpdateManagementPostIF,
      UPLOAD_FOLDER_MAP.termOfUse
    );

    return await new ForcedUpdateManagement(body).updateById({ id });
  }

  static async updateMany(updates: ForcedUpdateManagementPostIF[]) {
    const payload = updates.map((update) => new ForcedUpdateManagement(update));

    return await ForcedUpdateRepo.updateManyById(payload);
  }

  static async deleteById(id: number) {
    return await ForcedUpdateRepo.deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await ForcedUpdateRepo.deleteManyById(ids);
  }
}

class ForcedUpdateManagement implements ForcedUpdateManagementPostIF {
  public id?: number;
  public managementName: string;
  public version: string;
  public operateSystem: string;
  public publishedDate: string | Date;
  public updatedAt: string;
  public record?: string;
  public appMasterId: string | number;

  public constructor({
    version,
    managementName,
    operateSystem,
    publishedDate,
    record,
    appMasterId,
  }: ForcedUpdateManagementPostIF) {
    this.version = version.toString();
    this.managementName = managementName.toString();
    this.operateSystem = operateSystem;
    this.publishedDate = new Date(publishedDate).toISOString();
    this.updatedAt = new Date().toISOString();
    this.record = record;
    this.appMasterId = appMasterId;
  }

  public async create() {
    const payload: ForcedUpdateManagementPostIF = this;
    payload['operateSystem'] = payload['operateSystem'].toString();
    return await ForcedUpdateRepo.insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: ForcedUpdateManagementPostIF = this;
    return await ForcedUpdateRepo.updateById({ id, payload });
  }
}

export default ForcedUpdateManagementFactory;
