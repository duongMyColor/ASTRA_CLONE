import { ForcedUpdateManagementResponseIF } from '@repo/types/forceUpdateManagement';
import {
  OPERATE_IOS,
  OPERATE_ANDROID,
  STATUS_DEACTIVE,
  STATUS_ACTIVE,
} from '@repo/consts/forceUpdate';
import dayjs from 'dayjs';

function secondsToMilliseconds(date: string) {
  return dayjs(date).valueOf();
}

const updateStatus = (data: any[]) => {
  let currentTime = new Date().toISOString();
  for (let i = 0; i < data.length; i++) {
    if (
      secondsToMilliseconds(currentTime) >=
      secondsToMilliseconds(data[i].publishedDate)
    ) {
      data[i]['status'] = STATUS_ACTIVE;
      break;
    }
  }
};

function sortAndFilterData(
  data: ForcedUpdateManagementResponseIF[],
  operateSystem: string
) {
  return data
    .filter((value) => value.operateSystem === operateSystem)
    .sort(
      (a, b) =>
        secondsToMilliseconds(b.publishedDate) -
        secondsToMilliseconds(a.publishedDate)
    );
}
export const updateStatusAll = (data: ForcedUpdateManagementResponseIF[]) => {
  data.forEach((value) => (value.status = STATUS_DEACTIVE));

  const currentDate = new Date();

  const groupedData: { [key: string]: ForcedUpdateManagementResponseIF[] } = {};

  data.forEach((item) => {
    const key = `${item.appMasterId}_${item.textOperate}`;

    groupedData[key] = groupedData[key] || [];

    groupedData[key]?.push(item);
  });

  Object.values(groupedData).forEach((group) => {
    const groupedByTextOperate: {
      [key: string]: ForcedUpdateManagementResponseIF[];
    } = {};

    group.forEach((item: ForcedUpdateManagementResponseIF) => {
      if (item.textOperate) {
        const textOperate = item.textOperate;

        if (!groupedByTextOperate[textOperate]) {
          groupedByTextOperate[textOperate] = [];
        }

        groupedByTextOperate[textOperate]?.push(item);
      }
    });

    Object.values(groupedByTextOperate).forEach((subGroup) => {
      let closestItem: ForcedUpdateManagementResponseIF | any = null;
      let closestDateDiff = Infinity;

      subGroup.forEach((item: ForcedUpdateManagementResponseIF) => {
        const publishedDate = new Date(item.publishedDate);

        if (publishedDate < currentDate) {
          const dateDiff = Math.abs(
            currentDate.getTime() - publishedDate.getTime()
          );

          if (dateDiff < closestDateDiff) {
            closestDateDiff = dateDiff;
            closestItem = item;
          }
        }
      });

      if (closestItem) {
        closestItem.status = STATUS_ACTIVE;
      }
    });
  });
  return data;
};
