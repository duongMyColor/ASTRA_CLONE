export interface PerformanceTypeMasterResponseIF {
  id: number;
  typeName: string;
  createdAt: string;
  updatedAt: string;
}

export interface PerformanceTypeMasterPostIF {
  id?: number;
  typeName: string;
}

// export interface ProductPostFormIF extends ProductPostIF {
//   Performance: PerformancePostIF[];
// }

// export interface PerformanceResponseIF {
//   id: id;
//   name: string;
//   performanceTypeMasterId: number;
//   assetBundleIOS: string;
//   acstaId: number;
//   assetBundleAndroid: string;
//   createdAt: string | Date;
//   updatedAt: string | Date;
// }

// export interface PerformancePostIF {
//   id?: id;
//   name: string;
//   performanceTypeMasterId: number;
//   assetBundleIOS: string;
//   acstaId: number;
//   assetBundleAndroid: string;
// }
