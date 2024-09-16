export interface AplicationMasterResponseIF {
  id?: number;
  appId?: number;

  appName: string;
  packageName: string | number;
  termsOfUseId: number;
  licenseId: string;
  assetBundleIOS: string;
  assetBundleAndroid: string;
  outlineUrl: string;
  encryptKey: string;

  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface AplicationMasterPostIF {
  id?: number;
  appId?: number;
  appName: string;
  packageName: string | number;
  termsOfUseId: number;
  licenseId: string;
  assetBundleIOS: string;
  assetBundleAndroid: string;
  encryptKey: string;
  outlineUrl: string;
  updatedAt?: string | Date;
}
export interface NameCheckType {
  packageName?: string;
  appName?: string;
}
