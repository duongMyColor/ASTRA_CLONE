import type {
  CreateResult,
  DataProvider,
  DeleteResult,
  GetListResult,
  GetManyReferenceResult,
  GetOneResult,
  UpdateParams,
  UpdateResult,
} from 'react-admin';
import dayjs from 'dayjs';
const applicationMasterCallbackHandler = {
  resource: 'application-masters',

  afterGetList: async (
    response: GetListResult,
    dataProvider: DataProvider
  ): Promise<GetListResult> => {
    // const { classificationId } = response.data;

    return response;
  },
  afterGetOne: async (
    response: GetOneResult,
    dataProvider: DataProvider
  ): Promise<GetOneResult> => {
    const data = response.data;
    console.log({ data });
    data['assetDataAndroid'] = {
      src: data.assetBundleAndroid.split('/').pop(),
      title: data.assetBundleAndroid.split('/').pop(),
    };
    data['assetDataIOS'] = {
      src: data.assetBundleIOS.split('/').pop(),
      title: data.assetBundleIOS.split('/').pop(),
    };

    data['assetDataOutlineUrl'] = {
      src: data.outlineUrl.split('/').pop(),
      title: data.outlineUrl.split('/').pop(),
    };

    return response;
  },
};

export default applicationMasterCallbackHandler;
