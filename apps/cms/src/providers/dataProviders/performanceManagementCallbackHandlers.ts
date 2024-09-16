import type {
  DataProvider,
  GetListResult,
  GetOneResult,
  UpdateParams,
} from 'react-admin';

const performanceManagementCallbackHandlers = {
  resource: 'performances',

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

    data['acstaIdAndName'] = `${data.acsta.id} : ${data.acsta.acstaName}`;
    data['performanceTypeMasterIdAndName'] =
      `${data.performanceTypeMaster.id} : ${data.performanceTypeMaster.typeName}`;

    return response;
  },
};

export default performanceManagementCallbackHandlers;

// import type { DataProvider, GetOneResult } from 'react-admin';

// const performanceManagementCallbackHandlers = {
//   resource: 'performances',

//   afterGetOne: async (
//     response: GetOneResult,
//     dataProvider: DataProvider
//   ): Promise<GetOneResult> => {
//     const data = response.data;
//     console.log({ data });

//     // data['assetDataAndroid'] = {
//     //   src: data.assetBundleAndroid.split('/').pop(),
//     //   title: data.assetBundleAndroid.split('/').pop(),
//     // };
//     // data['assetDataIOS'] = {
//     //   src: data.assetBundleIOS.split('/').pop(),
//     //   title: data.assetBundleIOS.split('/').pop(),
//     // };

//     return response;
//   },
// };

// export default performanceManagementCallbackHandlers;
