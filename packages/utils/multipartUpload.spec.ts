import { encryptFile } from '@repo/utils/fileUtils';
import dataProvider from '../../apps/cms/src/providers/dataProviders/dataProvider';
import {
  uploadMuiltpart,
  createMultipartUpload,
  uploadParts,
  completeMultipartUpload,
} from './multipartUpload';

jest.mock('@repo/utils/fileUtils');
jest.mock('../../apps/cms/src/providers/dataProviders/dataProvider');

describe('multipartUpload', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create multipart upload', async () => {
    const key = 'test-key';
    const mockResponse = {
      data: { json: { key: 'res-key', uploadId: 'upload-id' } },
    };
    dataProvider.multipartUpload.mockResolvedValue(mockResponse);

    const result = await createMultipartUpload(key);

    expect(dataProvider.multipartUpload).toHaveBeenCalledWith(
      'POST',
      'mpu-create',
      { key }
    );
    expect(result).toEqual({ resKey: 'res-key', uploadId: 'upload-id' });
  });

  it('should upload parts', async () => {
    const encryptedFile = new ArrayBuffer(10 * 1024 * 1024); // 10MB
    const resKey = 'test-key';
    const uploadId = 'test-upload-id';
    const mockResponse = {
      data: { json: { ETag: 'test-etag', PartNumber: 1 } },
    };

    dataProvider.multipartUpload.mockResolvedValue(mockResponse);

    const parts = await uploadParts(encryptedFile, resKey, uploadId);

    expect(dataProvider.multipartUpload).toHaveBeenCalledTimes(2); // 10MB / 5MB chunks = 2 calls
    expect(parts).toEqual([
      { ETag: 'test-etag', PartNumber: 1 },
      { ETag: 'test-etag', PartNumber: 1 },
    ]);
  });

  it('should complete multipart upload', async () => {
    const resKey = 'test-key';
    const uploadId = 'test-upload-id';
    const parts = [{ ETag: 'test-etag', PartNumber: 1 }];

    await completeMultipartUpload(resKey, uploadId, parts);

    expect(dataProvider.multipartUpload).toHaveBeenCalledWith(
      'POST',
      'mpu-complete',
      {
        key: resKey,
        uploadId,
        parts,
      }
    );
  });

  it('should upload multipart', async () => {
    const file = new File(['test'], 'test.txt');
    const encryptKey = 'encrypt-key';
    const mockEncryptedFile = 'encrypted-file';
    const mockKey = 'mock-key';
    const mockResKey = 'mock-res-key';
    const mockUploadId = 'mock-upload-id';
    const mockParts = [{ ETag: 'etag', PartNumber: 1 }];

    (encryptFile as jest.Mock).mockResolvedValue(mockEncryptedFile);
    (createMultipartUpload as jest.Mock).mockResolvedValue({
      resKey: mockResKey,
      uploadId: mockUploadId,
    });
    (uploadParts as jest.Mock).mockResolvedValue(mockParts);

    const result = await uploadMuiltpart(file, encryptKey);

    expect(encryptFile).toHaveBeenCalledWith(file, encryptKey);
    expect(createMultipartUpload).toHaveBeenCalledWith(mockKey);
    expect(uploadParts).toHaveBeenCalledWith(
      mockEncryptedFile,
      mockResKey,
      mockUploadId
    );
    expect(completeMultipartUpload).toHaveBeenCalledWith(
      mockResKey,
      mockUploadId,
      mockParts
    );
    expect(result).toBe(mockKey);
  });
});
