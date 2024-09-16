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

export const metadata = z.object({
  contentUrl: z.string().openapi({
    example: 'term-of-use/1716091800044/demo.html',
  }),
});

export const ResponseSchema = z.object({
  message: z.string().openapi({ example: 'get Term Of Use  success!' }),
  status: z.number().openapi({ example: 200 }),
  reason: z.string().openapi({ example: 'OK' }),
  metadata: metadata,
});
