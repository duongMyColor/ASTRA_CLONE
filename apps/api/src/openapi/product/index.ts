import { z } from '@hono/zod-openapi';

export const ParamsSchema = z.object({
  id: z.string().openapi({
    param: {
      name: 'id',
      in: 'path',
    },
    type: 'integer',
    example: '1',
  }),
});

export const QueySchema = z.object({
  ids: z.string().openapi({
    param: {
      name: 'ids',
      in: 'query',
    },
    type: 'string',
    example: '1,2,3',
    description: 'comma separated list of ids',
  }),
});

export const metadata = z.object({
  modeId: z.number().openapi({ example: 1 }),
  modeTypeId: z.number().openapi({ example: 1 }),
  assetBundleIOS: z
    .string()
    .openapi({ example: 'application-master/1716161586611/assetBundles' }),
  acstaId: z.number().openapi({ example: 1 }),
  assetBundleAndroid: z
    .string()
    .openapi({ example: 'application-master/1716161587314/assetBundles' }),
});

export const ResponseSchemaObject = z.object({
  message: z.string().openapi({ example: 'get Product  success!' }),
  status: z.number().openapi({ example: 200 }),
  reason: z.string().openapi({ example: 'OK' }),
  metadata: metadata,
});

export const ResponseSchemaArray = z.object({
  message: z.string().openapi({ example: 'get Product  success!' }),
  status: z.number().openapi({ example: 200 }),
  reason: z.string().openapi({ example: 'OK' }),
  metadata: z.array(metadata),
});
