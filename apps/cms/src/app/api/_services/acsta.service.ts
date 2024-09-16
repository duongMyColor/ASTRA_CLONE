import { AcstaPostIF } from '@repo/types/acsta';
import AcstaRepo from '../_repos/acsta.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import { convertFormDataToObject } from '@repo/utils/objectUtils';
import { UPLOAD_FOLDER_MAP } from '@repo/consts/general';
import UploadFileService from './upload.service';
import { RectData } from '@repo/types/rectangleEditor';
class AcstaFactory {
  static async create({ payload }: { payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);

    const body = await new UploadFileService().uploadFile(
      paylodObj as AcstaPostIF,
      UPLOAD_FOLDER_MAP.acsta
    );

    return await new Acsta(body).create();
  }

  static async createMany(body: AcstaPostIF[]) {
    const payload = body.map(
      (acsta_and_conditions) => new Acsta(acsta_and_conditions)
    );
    return await AcstaRepo.insertMany(payload);
  }

  static async getOneById(id: number) {
    return await AcstaRepo.getOneById(id);
  }
  static async getOneAndParent(id: number) {
    return await AcstaRepo.getOneAndParent(id);
  }

  static async getAll() {
    return await AcstaRepo.getAll();
  }

  static async getAllWithQuery({ filter, range, sort }: GetAllQueryIF) {
    return await AcstaRepo.getAllWithQuery({ filter, range, sort });
  }

  static async getAllWithFilters({ filter, range, sort }: GetAllQueryIF) {
    return await AcstaRepo.getAllWithFilters({ filter, range, sort });
  }

  static async getManyReference(params: GetManyReferenceParams) {
    return await AcstaRepo.getManyReference(params);
  }

  static async updateById({ id, payload }: { id: number; payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);

    const body = await new UploadFileService().uploadFile(
      paylodObj as AcstaPostIF,
      UPLOAD_FOLDER_MAP.acsta
    );

    return await new Acsta(body).updateById({ id });
  }

  static async updateScanDataById({
    id,
    payload,
  }: {
    id: number;
    payload: RectData;
  }) {
    const body = {
      scanColors: JSON.stringify(payload.scanColors),
      scanOriginX: payload.originX,
      scanOriginY: payload.originY,
      scanWidth: payload.width,
      scanHeight: payload.height,
    };

    return await new Acsta(body as AcstaPostIF).updateById({ id });
  }

  static async updateMany(updates: AcstaPostIF[]) {
    const payload = updates.map((update) => new Acsta(update));

    return await AcstaRepo.updateManyById(payload);
  }

  static async deleteById(id: number) {
    return await AcstaRepo.deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await AcstaRepo.deleteManyById(ids);
  }
}

class Acsta implements AcstaPostIF {
  public id?: number;
  public managementName: string;
  public acstaName: string;
  public applicationId: number;
  public thumbnailUrl: string;
  public scanImageUrl: string;
  // public acstaBasicInfoId: number;
  public scanOriginX: GLfloat;
  public scanOriginY: GLfloat;
  public scanWidth: GLfloat;
  public scanHeight: GLfloat;
  public scanColors: string;
  // public modeId?: number;
  public dateStart?: string | Date;
  public dateEnd?: string | Date | null;
  public updatedAt: string | Date;
  public record?: string;

  public constructor({
    managementName,
    acstaName,
    applicationId,
    thumbnailUrl,
    scanImageUrl,
    // acstaBasicInfoId,
    scanOriginX,
    scanOriginY,
    scanWidth,
    scanHeight,
    scanColors,
    // modeId,
    dateStart,
    dateEnd,
    record,
  }: AcstaPostIF) {
    this.acstaName = acstaName?.toString();
    this.managementName = managementName?.toString();
    this.thumbnailUrl = thumbnailUrl as string;
    this.scanImageUrl = scanImageUrl as string;
    this.applicationId = applicationId;
    // this.acstaBasicInfoId = acstaBasicInfoId;
    this.scanOriginX = scanOriginX;
    this.scanOriginY = scanOriginY;
    this.scanWidth = scanWidth;
    this.scanHeight = scanHeight;
    this.scanColors = scanColors;

    // this.modeId = modeId;
    this.dateStart = dateStart ? new Date(dateStart)?.toISOString() : undefined;
    this.dateEnd = dateEnd ? new Date(dateEnd)?.toISOString() : null;
    this.dateStart = dateStart ? new Date(dateStart)?.toISOString() : undefined;
    this.updatedAt = new Date()?.toISOString();
    this.record = record;
  }

  public async create() {
    const payload: AcstaPostIF = this;
    console.log('payload', payload);

    return await AcstaRepo.insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: AcstaPostIF = this;

    return await AcstaRepo.updateById({ id, payload });
  }
}

export default AcstaFactory;
