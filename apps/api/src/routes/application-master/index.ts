// books.ts
import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import applicationMasterController from '@/controllers/applicationMaster.controller';
import {
  ResponseSchemaObject,
  ResponseSchemaArray,
  ParamsSchema,
  QueySchema,
} from '@/openapi/application-master';
import { validateId, validateIds } from '@repo/utils/validateRequest';
import { Authorization, QuerySchemaBundleId, securitySchemes } from '@/openapi';
const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: 'get',
    path: '/',
    description: 'Get application masters by bundleId',
    security: securitySchemes,

    request: {
      query: QuerySchemaBundleId,
      headers: Authorization,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ResponseSchemaObject,
          },
        },
        description: 'Ok Response',
      },
    },
    tags: ['Application Master'],
  }),
  async (c): Promise<any> => {
    return c.json(await applicationMasterController.getByBundleId());
  }
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/many',
    description: 'Get many application masters by ids',
    security: securitySchemes,

    request: {
      query: QueySchema,
      headers: Authorization,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ResponseSchemaArray,
          },
        },
        description: 'Ok Response',
      },
    },
    tags: ['Application Master'],
  }),
  async (c): Promise<any> => {
    const ids = c.req.query('ids');

    validateIds(ids as string);

    const numIds = ids?.split(',').map((id) => parseInt(id, 10));
    return c.json(
      await applicationMasterController.getManyByIds(numIds as number[])
    );
  }
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    description: 'Get one application master by id',
    security: securitySchemes,

    request: {
      params: ParamsSchema,
      headers: Authorization,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ResponseSchemaObject,
          },
        },
        description: 'Ok Response',
      },
    },
    tags: ['Application Master'],
  }),
  async (c): Promise<any> => {
    const id = c.req.param('id');

    validateId(id);

    const numId = parseInt(id, 10);
    return c.json(await applicationMasterController.getOneById(numId));
  }
);

export default app;
