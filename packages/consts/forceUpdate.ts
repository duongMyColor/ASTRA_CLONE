const OPERATE_IOS = '0';
const OPERATE_ANDROID = '1';
const STATUS_ACTIVE = 'アクティブ';
const STATUS_DEACTIVE = '非アクティブ';

const OS_MAP = {
  ios: '0',
  android: '1',
};

const SORT_BY_TYPE = {
  number: ['no', 'id', 'appMasterId'],
  date: ['publishedDate', 'createdAt'],
  text: ['operateSystem', 'status'],
};
const SORT_BY_TYPE_ACSTA = {
  text: ['status', 'statusScanColors', 'scanColors'],
};

export {
  OPERATE_IOS,
  OPERATE_ANDROID,
  STATUS_ACTIVE,
  STATUS_DEACTIVE,
  OS_MAP,
  SORT_BY_TYPE,
  SORT_BY_TYPE_ACSTA,
};
