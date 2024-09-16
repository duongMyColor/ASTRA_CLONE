import type { DataProvider, GetOneResult } from 'react-admin';

const termOfUseManagementCallbackHandlers = {
  resource: 'term-of-uses',

  afterGetOne: async (
    response: GetOneResult,
    dataProvider: DataProvider
  ): Promise<GetOneResult> => {
    const { content } = response.data;

    const object = await dataProvider.getObject({ key: content }, 'text-file');
    response.data.content = object.data.body;

    return response;
  },
};

export default termOfUseManagementCallbackHandlers;
