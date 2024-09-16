import { AplicationMasterPostIF } from '@repo/types/applicationMaster';
import ApplicationMasterRepo from '../_repos/applicationMaster.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import { convertFormDataToObject } from '@repo/utils/objectUtils';
import UploadFileService from './upload.service';
import { UPLOAD_FOLDER_MAP } from '@repo/consts/general';

class ApplicationMasterFactory {
  static async create({ payload }: { payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);

    const body = await new UploadFileService().uploadFile(
      paylodObj as AplicationMasterPostIF,
      UPLOAD_FOLDER_MAP.applicationMaster
    );

    console.log('body', body);

    return await new ApplicationMaster(body).create();
  }

  static async createMany(animals: AplicationMasterPostIF[]) {
    const payload = animals.map((animal) => new ApplicationMaster(animal));
    return await ApplicationMasterRepo.insertMany(payload);
  }

  static async getOneById(id: number) {
    return await await ApplicationMasterRepo.getOneById(id);
  }
  static async getOneAndParent(id: number) {
    return await await ApplicationMasterRepo.getOneAndParent(id);
  }

  // static async getOneAndChildAndParent(id: number) {
  //   return await await getOneAndChildAndParent(id);
  // }

  static async getAll() {
    return await ApplicationMasterRepo.getAll();
  }

  static async getAllWithQuery({ filter, range, sort }: GetAllQueryIF) {
    return await ApplicationMasterRepo.getAllWithQuery({ filter, range, sort });
  }

  static async getAllWithFilters({ filter, range, sort }: GetAllQueryIF) {
    return await ApplicationMasterRepo.getAllWithFilters({
      filter,
      range,
      sort,
    });
  }

  static async getManyReference(params: GetManyReferenceParams) {
    return await ApplicationMasterRepo.getManyReference(params);
  }

  static async updateById({ id, payload }: { id: number; payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);

    const body = await new UploadFileService().uploadFile(
      paylodObj as AplicationMasterPostIF,
      UPLOAD_FOLDER_MAP.applicationMaster
    );
    return await new ApplicationMaster(body).updateById({ id });
  }

  static async updateMany(updates: AplicationMasterPostIF[]) {
    const payload = updates.map((update) => new ApplicationMaster(update));

    return await ApplicationMasterRepo.updateManyById(payload);
  }

  static async deleteById(id: number) {
    // const deletedRecord = await deleteById(id);

    // const { assetBundleIOS, assetBundleAndroid, outlineUrl } = deletedRecord;

    // const results = await Promise.allSettled([
    //   new UploadFileService().deleteFile(assetBundleIOS),
    //   new UploadFileService().deleteFile(assetBundleAndroid),
    //   new UploadFileService().deleteFile(outlineUrl),
    // ]);

    // results.forEach((result, i) => {
    //   if (result.status === 'rejected') {
    //     console.error(`Error deleting file ${i}: ${result.reason}`);
    //   }
    // });

    return await ApplicationMasterRepo.deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await ApplicationMasterRepo.deleteManyById(ids);
  }
  static async safetyDeleteById(id: number) {
    return await ApplicationMasterRepo.safetyDeleteById(id);
  }
}

class ApplicationMaster implements AplicationMasterPostIF {
  public appName: string;
  public packageName: string | number;
  public termsOfUseId: number;
  public licenseId: string;
  public assetBundleIOS: string;
  public assetBundleAndroid: string;
  public outlineUrl: string;
  public encryptKey: string;
  public updatedAt?: string | Date;

  public constructor({
    appName,
    packageName,
    termsOfUseId,
    licenseId,
    assetBundleIOS,
    assetBundleAndroid,
    outlineUrl,
    encryptKey,
  }: AplicationMasterPostIF) {
    this.appName = appName.toString();
    this.packageName = packageName.toString();
    this.termsOfUseId = termsOfUseId;
    this.licenseId = licenseId;
    this.assetBundleIOS = assetBundleIOS;
    this.assetBundleAndroid = assetBundleAndroid;
    this.outlineUrl = outlineUrl;
    this.encryptKey = encryptKey;
    this.updatedAt = new Date().toISOString();
  }

  public async create() {
    const payload: AplicationMasterPostIF = this;

    // TODO: validate payload
    return await ApplicationMasterRepo.insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: AplicationMasterPostIF = this;
    // TODO: validate payload
    return await ApplicationMasterRepo.updateById({ id, payload });
  }
}

export default ApplicationMasterFactory;
