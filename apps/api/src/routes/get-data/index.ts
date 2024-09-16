import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import getDataController from '@/controllers/getData.controller';
import { ResponseSchema, ParamsSchema } from '@/openapi/get-data';
import { validateDate } from '@repo/utils/validateRequest';
import { Authorization, QuerySchemaBundleId, securitySchemes } from '@/openapi';

const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: 'get',
    path: '/init',
    description: 'Get intialize data',
    security: securitySchemes,

    request: {
      query: QuerySchemaBundleId,
      headers: Authorization,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ResponseSchema,
          },
        },
        description: 'Ok Response',
      },
    },
    tags: ['Data'],
  }),
  async (c): Promise<any> => {
    return c.json(await getDataController.getInitData());
  }
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/updated/{lastSyncDate}',
    description: 'Get updated data',
    security: securitySchemes,

    request: {
      params: ParamsSchema,
      query: QuerySchemaBundleId,
      headers: Authorization,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ResponseSchema,
          },
        },
        description: 'Ok Response',
      },
    },
    tags: ['Data'],
  }),
  async (c): Promise<any> => {
    const lastSyncDate = c.req.param('lastSyncDate');

    validateDate(lastSyncDate);

    return c.json(await getDataController.getUpdateData(lastSyncDate));
  }
);

export default app;
