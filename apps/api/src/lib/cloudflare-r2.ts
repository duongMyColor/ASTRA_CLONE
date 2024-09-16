import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import type {
  ListBucketsCommandOutput,
  ListObjectsV2CommandOutput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getBucketName, getS3Client } from './globalObject';

// const ACOUNT_ID = CLOUDFLARE_ACCOUNT_ID;
// const ACCESS_KEY_ID = CLOUDFLARE_ACCESS_KEY_ID;
// const SECRET_ACCESS_KEY = CLOUDFLARE_SECRET_ACCESS_KEY;

// if (!ACOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
//   throw new Error('Missing Cloudflare configuration in environment variables.');
// }

// const S3 = new S3Client({
//   region: 'auto',
//   endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
//   credentials: {
//     accessKeyId: CLOUDFLARE_ACCESS_KEY_ID as string,
//     secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY as string,
//   },
// });

const generateS3Client = (
  accountId: string,
  accessKeyId: string,
  secretAccessKey: string
) => {
  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
};

/**
 * List buckets in the account.
 * @returns
 * {
 *     '$metadata': {
 *     httpStatusCode: 200,
 *         requestId: undefined,
 *         extendedRequestId: undefined,
 *         cfId: undefined,
 *         attempts: 1,
 *         totalRetryDelay: 0
 * },
 *     Buckets: [
 *     { Name: 'user-uploads', CreationDate: 2022-04-13T21:23:47.102Z },
 *     { Name: 'my-bucket-name', CreationDate: 2022-05-07T02:46:49.218Z }
 *     ],
 *     Owner: {
 *         DisplayName: '...',
 *         ID: '...'
 *     }
 * }
 */
const listBuckets = async (): Promise<ListBucketsCommandOutput> => {
  try {
    const s3Client = getS3Client();
    if (!s3Client) {
      throw new Error('S3 client not found');
    }
    return await s3Client.send(new ListBucketsCommand(''));
  } catch (error) {
    console.error('Failed to list buckets:', error);
    throw new Error('Error listing buckets');
  }
};

/**
 *
 * @param bucketName
 * @returns
 * {
 *     '$metadata': {
 *       httpStatusCode: 200,
 *       requestId: undefined,
 *       extendedRequestId: undefined,
 *       cfId: undefined,
 *       attempts: 1,
 *       totalRetryDelay: 0
 *     },
 *     CommonPrefixes: undefined,
 *     Contents: [
 *       {
 *         Key: 'cat.png',
 *         LastModified: 2022-05-07T02:50:45.616Z,
 *         ETag: '"c4da329b38467509049e615c11b0c48a"',
 *         ChecksumAlgorithm: undefined,
 *         Size: 751832,
 *         StorageClass: 'STANDARD',
 *         Owner: undefined
 *       },
 *       {
 *         Key: 'todos.txt',
 *         LastModified: 2022-05-07T21:37:17.150Z,
 *         ETag: '"29d911f495d1ba7cb3a4d7d15e63236a"',
 *         ChecksumAlgorithm: undefined,
 *         Size: 279,
 *         StorageClass: 'STANDARD',
 *         Owner: undefined
 *       }
 *     ],
 *     ContinuationToken: undefined,
 *     Delimiter: undefined,
 *     EncodingType: undefined,
 *     IsTruncated: false,
 *     KeyCount: 8,
 *     MaxKeys: 1000,
 *     Name: 'my-bucket-name',
 *     NextContinuationToken: undefined,
 *     Prefix: undefined,
 *     StartAfter: undefined
 *   }
 */
const ListObjects = async (): Promise<ListObjectsV2CommandOutput> => {
  try {
    const s3Client = getS3Client();
    const bucketName = getBucketName();
    if (!s3Client) {
      throw new Error('S3 client not found');
    }

    return await s3Client.send(
      new ListObjectsV2Command({ Bucket: bucketName })
    );
  } catch (error) {
    console.error('Failed to list objects:', error);
    throw new Error('Error listing objects');
  }
};

// Use the expiresIn property to determine how long the presigned link is valid.
/**
 * Get a presigned URL for a specific key in a bucket.
 * @param bucketName
 * @param key
 * @returns Presigned URL
 * https://my-bucket-name.<accountid>.r2.cloudflarestorage.com/dog.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential<credential>&X-Amz-Date=<timestamp>&X-Amz-Expires=3600&X-Amz-Signature=<signature>&X-Amz-SignedHeaders=host&x-id=GetObject
 */
const getPresignedUrl = async (key: string) => {
  const bucketName = getBucketName();
  // try {
  //   const s3Client = getS3Client();

  //   if (!s3Client) {
  //     throw new Error('S3 client not found');
  //   }

  //   return await getSignedUrl(
  //     s3Client,
  //     new GetObjectCommand({ Bucket: bucketName, Key: key }),
  //     { expiresIn: 7200 }
  //   );
  // } catch (error) {
  //   console.error('Failed to get presigned URL: ' + bucketName + key, error);
  //   throw new Error('Error getting presigned URL');
  // }
  return key;
};

// You can also create links for operations such as putObject to allow temporary write access to a specific key.
/**
 * Get a presigned URL for a put operation.
 * @param bucketName
 * @param key
 * @returns Presigned URL for put operation
 */
const getPresignedUrlForPut = async (key: string) => {
  try {
    const s3Client = getS3Client();
    const bucketName = getBucketName();

    if (!s3Client) {
      throw new Error('S3 client not found');
    }

    return await getSignedUrl(
      s3Client,
      new PutObjectCommand({ Bucket: bucketName, Key: key }),
      { expiresIn: 3600 }
    );
  } catch (error) {
    console.error('Failed to get presigned URL for put:', error);
    throw new Error('Error getting presigned URL for put');
  }
};

export {
  listBuckets,
  ListObjects,
  getPresignedUrl,
  getPresignedUrlForPut,
  generateS3Client,
};
