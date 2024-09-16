import { RecordValue } from './general';

export type FilterType = Filter;

export interface ResponseIF {
  message: string;
  status?: number;
  reason?: string;
  metadata: RecordValue;
  count?: number;
}

export interface GetAllQueryIF {
  filter: FilterType;
  range: number[];
  sort: string[];
  include?: RecordValue;
}

export type GetObjectType = 'image' | 'text-file';

export interface ErrorResponse extends Error {
  status?: StatusCode;
}
