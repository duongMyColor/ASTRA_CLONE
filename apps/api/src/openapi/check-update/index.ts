import { z } from '@hono/zod-openapi';

// Define Zod schema for request validation
export const updateCheckSchema = z.object({
  os: z.enum(['ios', 'android']),
  version: z.string().openapi({
    example: '1.1',
  }),
  bundleId: z.string().openapi({
    example: 'com.example.app',
  }),
});

export const metadata = z.object({
  mandatoryUpdate: z.boolean().openapi({
    example: true,
    description:
      'Whether the update is mandatory. true is mandatory, false is not.',
  }),
  version: z.string().nullable().openapi({
    example: '1.1',
  }),
  publishedDate: z.string().nullable().openapi({
    example: '2024-05-19T04:09:00.000Z',
  }),
});

export const updateCheckResponseSchema = z.object({
  message: z.string().openapi({
    example: 'check update success!',
  }),
  metadata: metadata,
});
