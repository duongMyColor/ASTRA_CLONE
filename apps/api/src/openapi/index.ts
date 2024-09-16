import { z } from '@hono/zod-openapi';

export const QuerySchemaBundleId = z.object({
  bundleId: z.string().openapi({
    param: {
      name: 'bundleId',
      in: 'query',
    },
    type: 'string',
    example: 'abc.com',
    description: 'bundleId or package name of the application',
  }),
});

export const Authorization = z.object({
  // Header keys must be in lowercase, `Authorization` is not allowed.
  authorization: z.string().openapi({
    description:
      'Basic Authorization header. Ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization',
    example: 'Basic <Base64 encoded username and password>',
  }),
});

export const securitySchemes = [
  {
    BasicAuth: [],
  },
];
