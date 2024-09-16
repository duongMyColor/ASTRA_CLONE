import { ForcedUpdateManagementResponseIF } from '@repo/types/forceUpdateManagement';
import { RecordValue } from '@repo/types/general';
import dayjs from 'dayjs';

const getVersionEnd = (
  listUpdateAllStorage: ForcedUpdateManagementResponseIF[],
  values: RecordValue
): string[] | undefined => {
  console.log({ listUpdateAllStorage });
  let versionEnd = listUpdateAllStorage
    .filter(
      (value: ForcedUpdateManagementResponseIF) =>
        value?.operateSystem === values?.operateSystem &&
        value?.appMasterId === values.appMasterId
    )
    .sort(
      (
        a: ForcedUpdateManagementResponseIF,
        b: ForcedUpdateManagementResponseIF
      ) => dayjs(b.publishedDate).valueOf() - dayjs(a.publishedDate).valueOf()
    )[0]
    ?.version.split('.');

  return versionEnd;
};

export const validateVersion = (values: RecordValue): boolean | string => {
  const regex = /^([1-9][0-9]?|0)\.([1-9][0-9]?|0)\.([1-9][0-9]?|0)$/;

  if (!values?.version) return '必須';
  if (!regex.test(values?.version)) {
    return '1.2.34のようにセマンティックバージョニング形式で設定してください';
  }

  const listUpdateAllStorage = JSON.parse(
    localStorage.getItem('listUpdateAll') || 'null'
  );

  let versionEnd = getVersionEnd(listUpdateAllStorage, values);
  if (versionEnd === undefined) {
    versionEnd = [];
  }

  let versionNext = values?.version.split('.');

  let maxLength =
    versionNext?.length >= versionEnd?.length
      ? versionNext?.length
      : versionEnd?.length;

  for (let i = 0; i < maxLength; i++) {
    const nextValue = parseInt(versionNext[i]) || 0;
    const endValue = parseInt(versionEnd[i] as string) || 0;

    if (nextValue > endValue) {
      return true;
    } else if (nextValue < endValue) {
      return '前回より大きいバージョニングを設定する必要があります';
    }
  }

  return '前回より大きいバージョニングを設定する必要があります';
};
