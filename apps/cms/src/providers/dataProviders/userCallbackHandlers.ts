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
import { MAP_ROLE } from '@repo/consts/user';
const userCallbackHandler = {
  resource: 'users',

  // afterGetList: async (
  //   response: GetListResult,
  //   dataProvider: DataProvider
  // ): Promise<GetListResult> => {
  //   let data = response.data;

  //   data = data.map((value) => {
  //     value['textRolebyJP'] = MAP_ROLE[value.role as keyof typeof MAP_ROLE];

  //     return value;
  //   });

  //   return response;
  // },

  // afterGetOne: async (
  //   response: GetOneResult,
  //   dataProvider: DataProvider
  // ): Promise<GetOneResult> => {
  //   const data = response.data;

  //   data['textRolebyJP'] = MAP_ROLE[data.role as keyof typeof MAP_ROLE];

  //   return response;
  // },
};

export default userCallbackHandler;
