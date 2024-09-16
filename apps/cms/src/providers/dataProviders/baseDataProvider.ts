import { fetchUtils } from 'react-admin';
import type {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from 'react-admin';
import removeEmptyProperties from '@repo/utils/removeEmptyProperties';
import { exclude } from '@repo/utils/excludeKey';

import { RecordValue } from '@repo/types/general';
import { MAP_RESOURE } from '@repo/consts/general';
import {
  MultipartUploadActions,
  MultipartUploadAllowMethods,
  MultipartUploadBody,
} from '@repo/types/upload';
import { GetObjectType } from '@repo/types/response';
import { convertToFormData } from '@repo/utils/formData';

const apiUrl = `/api`;
const httpClient = fetchUtils.fetchJson;

const baseDataProvider: DataProvider = {
  // get a list of records based on sort, filter, and pagination
  getList: async (
    resource: string,
    params: GetListParams
  ): Promise<GetListResult> => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;
    const {
      json: { metadata, count },
    } = await httpClient(url);
    console.log('metadata: ', metadata);

    return {
      data: metadata,
      total: count,
    };
  },
  // get a single record by id
  getOne: async (
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult> => {
    console.log({ params });

    const url = `${apiUrl}/${resource}/${params.id}`;
    console.log({ url });
    const {
      json: { metadata },
    } = await httpClient(url);
    console.log('metadata:', metadata);

    return {
      data: metadata,
    };
  },

  // get a list of records based on an array of ids
  getMany: async (
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult> => {
    const url = `${apiUrl}/${resource}?id=${params.ids}`;
    const {
      json: { metadata },
    } = await httpClient(url);

    return {
      data: metadata,
    };
  },
  // get the records referenced to another record, e.g. comments for a post
  getManyReference: async (
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult> => {
    const query = JSON.stringify(params);

    const url = `${apiUrl}/${resource}/refer?${query}`;
    const {
      json: { metadata },
    } = await httpClient(url);

    return metadata;
  },

  getAll: async (resource: string) => {
    const url = `${apiUrl}/${resource}/batch`;
    const {
      json: { metadata },
    } = await httpClient(url);

    return metadata;
  },
  // create a record
  create: async (
    resource: string,
    params: CreateParams
  ): Promise<CreateResult> => {
    console.log({ resource, params });
    const url = `${apiUrl}/${resource}`;

    let body;
    if (params.data instanceof FormData) {
      body = params.data;
      body.append('record', `${MAP_RESOURE[resource]}`);
    } else {
      body = JSON.stringify(params.data);
    }

    const response = await httpClient(url, {
      method: 'POST',
      body,
    });
    const {
      json: { metadata },
    } = response;

    console.log(':::metadata data', metadata);
    return {
      data: metadata,
    };
  },

  createMany: async (
    resource: string,
    params: CreateParams
  ): Promise<CreateResult> => {
    const url = `${apiUrl}/${resource}/batch`;

    const body = JSON.stringify(params.data);

    const response = await httpClient(url, {
      method: 'POST',
      body,
    });
    const {
      json: { metadata },
    } = response;

    return {
      data: metadata,
    };
  },

  // update a record based on a patch
  update: async (
    resource: string,
    params: UpdateParams
  ): Promise<UpdateResult> => {
    const url = `${apiUrl}/${resource}/${params.id}`;

    let body;

    if (params.data instanceof FormData) {
      body = params.data;
    } else {
      body = JSON.stringify(
        exclude(removeEmptyProperties(params.data), [
          'createdAt',
          'updatedAt',
          'id',
        ])
      );
    }

    const response = await httpClient(url, {
      method: 'PUT',
      body,
    });
    const {
      json: { metadata },
    } = response;

    return {
      data: metadata,
    };
  },
  // update a list of records based on an array of ids and a common patch
  updateMany: async (
    resource: string,
    params: UpdateManyParams
  ): Promise<UpdateManyResult> => {
    const url = `${apiUrl}/${resource}/batch`;
    const body = JSON.stringify(params.data);

    const response = await httpClient(url, {
      method: 'PUT',
      body,
    });
    const {
      json: { metadata },
    } = response;

    return {
      data: metadata,
    };
  },
  // delete a record by id
  delete: async (
    resource: string,
    params: DeleteParams
  ): Promise<DeleteResult> => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const response = await httpClient(url, {
      method: 'DELETE',
    });
    const {
      json: { metadata },
    } = response;

    return {
      data: metadata,
    };
  },
  // delete a list of records based on an array of ids
  deleteMany: async (
    resource: string,
    params: DeleteManyParams
  ): Promise<DeleteManyResult> => {
    const url = `${apiUrl}/${resource}/batch`;
    const body = JSON.stringify(params.ids);

    const response = await httpClient(url, {
      method: 'DELETE',
      body,
    });

    const {
      json: { metadata },
    } = response;
    console.log('deleteMany');

    return {
      data: metadata,
    };
  },

  getObject: async (params: { key: string }, type: GetObjectType) => {
    const url = `${apiUrl}/upload/get-object/${type}`;

    const response = await httpClient(url, {
      method: 'POST',
      body: JSON.stringify(params),
    });

    return {
      data: response,
    };
  },
  checkExistName: async (
    resource: string,
    nameField: string | number,
    type: string
  ) => {
    const url = `${apiUrl}/${resource}/queryName?${type}=${nameField}`;
    const {
      json: { metadata },
    } = await httpClient(url);

    return {
      data: metadata,
    };
  },
  getOneByEmail: async (
    resource: string,
    email: string
  ): Promise<GetOneResult> => {
    const url = `${apiUrl}/${resource}/email?email=${email}`;
    console.log({ url });
    const {
      json: { metadata },
    } = await httpClient(url);
    console.log('metadata:', metadata);

    return {
      data: metadata,
    };
  },
  getIdLastest: async (resource: string) => {
    console.log({ resource });
    const url = `${apiUrl}/id-lastest?source=${MAP_RESOURE[resource]}`;
    const {
      json: { metadata },
    } = await httpClient(url);

    return {
      data: metadata,
    };
  },
  getIdLastestRecord: async (resource: string) => {
    console.log({ resource });
    const url = `${apiUrl}/id-lastest-of-record?record=${MAP_RESOURE[resource]}`;
    const {
      json: { metadata },
    } = await httpClient(url);

    console.log(':::response', metadata);

    return {
      data: metadata,
    };
  },
  multipartUpload: async (
    method: MultipartUploadAllowMethods,
    action: MultipartUploadActions,
    params: { body: MultipartUploadBody }
  ) => {
    const url = `${apiUrl}/upload/multipart/${action}`;

    if (method === 'PUT') {
      const body = convertToFormData(params.body);
      const response = await httpClient(url, {
        method: method,
        body: body,
      });

      return {
        data: response,
      };
    }

    const response = await httpClient(url, {
      method: method,
      body: JSON.stringify(params),
    });

    return {
      data: response,
    };
  },
  updateScanData: async (params: UpdateParams, id: number) => {
    const url = `${apiUrl}/acstas/scan-data/${id}`;
    const body = JSON.stringify(params.data);

    const response = await httpClient(url, {
      method: 'PUT',
      body,
    });

    const {
      json: { metadata },
    } = response;

    return {
      data: metadata,
    };
  },
};

export default baseDataProvider;
