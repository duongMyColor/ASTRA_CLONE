import { z } from '@hono/zod-openapi';
import { metadata as ResponseSchemaArrayAcsta } from '../acsta';
import { metadata as ResponseSchemaArrayApp } from '../application-master';
import { metadata as ResponseSchemaPerformance } from '../product';

export const ResponseSchema = z.object({
  message: z.string().openapi({ example: 'get License success!' }),
  status: z.number().openapi({ example: 200 }),
  reason: z.string().openapi({ example: 'OK' }),
  metadata: z.object({
    applicationMaster: ResponseSchemaArrayApp,
    acsta: z.array(ResponseSchemaArrayAcsta),
    performance: z.array(ResponseSchemaPerformance),
  }),
});

export const ParamsSchema = z.object({
  lastSyncDate: z.string().openapi({
    param: {
      name: 'lastSyncDate',
      in: 'path',
    },
    type: 'string',
    example: '2021-09-01T00:00:00.000Z',
    description: 'The last sync date. Zulu time (GMT)',
  }),
});

