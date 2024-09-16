import type { DataProvider, GetListResult, GetOneResult } from 'react-admin';

import dayjs from 'dayjs';
import { extractFilename } from '@repo/utils/fileUtils';
import { SORT_BY_TYPE_ACSTA } from '@repo/consts/forceUpdate';
import { RecordValue } from '@repo/types/general';

const determineStatus = (dateStart: Date | string, dateEnd: Date | string) => {
  const currentDate = dayjs();
  return currentDate.isBefore(dateStart) || currentDate.isAfter(dateEnd)
    ? '非アクティブ'
    : 'アクティブ';
};
const determineScanColors = (scanColors: string) => {
  return scanColors ? '設定済み' : '設定なし';
};

const AcstaManagementCallbackHandler = {
  resource: 'acstas',

  afterGetList: async (response: GetListResult): Promise<GetListResult> => {
    response.data.forEach((item) => {
      item.status = determineStatus(item.dateStart, item.dateEnd);
      item.statusScanColors = determineScanColors(item.scanColors);
    });
    let listParams = JSON.parse(
      localStorage.getItem('RaStore.acstas.listParams') as any
    );

    if (listParams && SORT_BY_TYPE_ACSTA['text'].includes(listParams.sort)) {
      const itemSort =
        listParams.sort === 'scanColors' ? 'statusScanColors' : listParams.sort;
      response.data.sort((a: RecordValue, b: RecordValue) =>
        listParams.order === 'ASC'
          ? a[itemSort].localeCompare(b[itemSort])
          : b[itemSort].localeCompare(a[itemSort])
      );
    }

    return response;
  },

  afterGetOne: async (
    response: GetOneResult,
    dataProvider: DataProvider
  ): Promise<GetOneResult> => {
    const { dateStart, dateEnd, thumbnailUrl, scanImageUrl } = response.data;

    response.data.status = determineStatus(dateStart, dateEnd);

    const [thumbnailUrlObj, scanImageUrlObj] = await Promise.all([
      dataProvider.getObject({ key: thumbnailUrl }, 'image'),
      dataProvider.getObject({ key: scanImageUrl }, 'image'),
    ]);

    response.data.scanImageUrl = {
      src: scanImageUrlObj.data.body,
      title: extractFilename(scanImageUrl),
    };
    response.data.thumbnailUrl = {
      src: thumbnailUrlObj.data.body,
      title: extractFilename(thumbnailUrl),
    };

    return response;
  },
};

export default AcstaManagementCallbackHandler;
