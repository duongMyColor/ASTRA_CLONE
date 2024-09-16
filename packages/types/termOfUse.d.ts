export interface TermOfUseResponseIF {
  id?: number;
  memo: string;
  content:
    | string
    | Buffer
    | Blob
    | File
    | FormData
    | URL
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | null;
  version: string;
  createdAt: string;
  updatedAt: string;
}

export interface TermOfUsePostIF {
  [key: string]: any;
  id?: number;
  memo: string |number| null;
  version: number;
  content: string | Buffer | File;
  publishedDate: string | Date;
  updatedAt?: string | Date;
  record?: string;
}
