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
  acstaId: z.number().openapi({ example: 1 }),
  appId: z.number().openapi({ example: 1 }),
  acstaName: z.string().openapi({ example: 'name1' }),
  thumbnailUrl: z.string().openapi({
    example:
      'acsta/1716161518729/Screen Shot 2022-11-04 at 10.13.27 (2) (1).png',
  }),
  scanImageUrl: z.string().openapi({
    example: 'acsta/1716161518784/Screen Shot 2022-11-04 at 10.13.27 (2).png',
  }),
  scanOriginX: z.number().openapi({ example: 0.26 }),
  scanOriginY: z.number().openapi({ example: 0.26 }),
  scanWidth: z.number().openapi({ example: 0.26 }),
  scanHeight: z.number().openapi({ example: 0.26 }),
  scanColors: z.array(z.number()).openapi({
    example: [
      0.967, 0, 0, 0, 0, 0.001, 0, 0, 0, 0, 0, 0, 0, 0.012, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0.019,
    ],
  }),
  modeId: z.array(z.number()).openapi({ example: [1] }),
});

export const ResponseSchemaObject = z.object({
  message: z.string().openapi({ example: 'get Acsta success!' }),
  status: z.number().openapi({ example: 200 }),
  reason: z.string().openapi({ example: 'OK' }),
  metadata: metadata,
});

export const ResponseSchemaArray = z.object({
  message: z.string().openapi({ example: 'get Acsta success!' }),
  status: z.number().openapi({ example: 200 }),
  reason: z.string().openapi({ example: 'OK' }),
  metadata: z.array(metadata),
});
