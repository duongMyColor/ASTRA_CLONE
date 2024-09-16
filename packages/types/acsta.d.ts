export interface AcstaResponseIF {
  [key: string]: any;
  id?: number;
  managementName: string;
  acstaName: string;
  applicationId: number;
  thumbnailUrl:
    | string
    | Buffer
    | Blob
    | File
    | FormData
    | URL
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | null;
  scanImageUrl:
    | string
    | Buffer
    | Blob
    | File
    | FormData
    | URL
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | null;
  acstaBasicInfoId?: number;
  scanOriginX: float;
  scanOriginY: float;
  scanWidth: float;
  scanHeight: float;
  scanColors: string;
  modeId?: number;
  dateStart: string | Date;
  dateEnd?: string | Date | null;
  updatedAt: string | Date;
}

export interface AcstaPostIF {
  [key: string]: any;
  id?: number;
  managementName: string;
  acstaName: string;
  applicationId: number;
  thumbnailUrl: string | Buffer | File;
  scanImageUrl: string | Buffer | File;
  acstaBasicInfoId?: number;
  scanOriginX: float;
  scanOriginY: float;
  scanWidth: float;
  scanHeight: float;
  scanColors: string;
  modeId?: string;
  dateStart?: string | Date;
  dateEnd?: string | Date | null;
  updatedAt?: string | Date;
  record?: string;
}

export interface AcstaApiResponseIF {
  id?: number;
  acstaId: number;
  appId: number;
  acstaName: string;
  applicationId?: number;
  thumbnailUrl: string;
  scanImageUrl: string;
  scanOriginX: float;
  scanOriginY: float;
  scanWidth: float;
  scanHeight: float;
  scanColors: string | number[];
  modeId?: string;
  performace?: any;
}
