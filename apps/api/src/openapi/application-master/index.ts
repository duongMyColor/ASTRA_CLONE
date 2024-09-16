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
  appId: z.number().openapi({ example: 1 }),
  appName: z.string().openapi({ example: 'appName' }),
  assetBundleIOS: z
    .string()
    .openapi({ example: 'application-master/1716160641744/assetBundles' }),
  assetBundleAndroid: z
    .string()
    .openapi({ example: 'application-master/1716160642046/assetBundles' }),
  outlineUrl: z.string().openapi({
    example: 'application-master/1716160642682/image.png',
  }),
  license: z.object({
    contentUrl: z.string().openapi({
      example: 'license/1724657576633/利用規約ダミーテキスト (1).htm',
    }),
  }),

  termOfUse: z.object({
    contentUrl: z.string().openapi({
      example: 'term-of-use/1724657576633/利用規約ダミーテキスト (1).htm',
    }),
  }),
});

export const ResponseSchemaObject = z.object({
  message: z.string().openapi({ example: 'get AplicationMaster  success!' }),
  status: z.number().openapi({ example: 200 }),
  reason: z.string().openapi({ example: 'OK' }),
  metadata: metadata,
});

export const ResponseSchemaArray = z.object({
  message: z.string().openapi({ example: 'get AplicationMaster  success!' }),
  status: z.number().openapi({ example: 200 }),
  reason: z.string().openapi({ example: 'OK' }),
  metadata: z.array(metadata),
});
