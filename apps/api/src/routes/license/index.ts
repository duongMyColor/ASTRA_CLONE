import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import licenseController from '@/controllers/license.controller';
import { ParamsSchema, ResponseSchema } from '@/openapi/license';
import { validateId } from '@repo/utils/validateRequest';
import { Authorization, securitySchemes } from '@/openapi';

const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: 'get',
    path: '/latest',
    description: 'Get the latest License',
    security: securitySchemes,
    request: {
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

    tags: ['License'],
  }),
  async (c): Promise<any> => {
    return c.json(await licenseController.getCurrentLicense());
  }
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    description: 'Get License by id',
    security: securitySchemes,

    request: {
      params: ParamsSchema,
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
    // headers: Authorization,

    tags: ['License'],
  }),
  async (c): Promise<any> => {
    const id = c.req.param('id');

    validateId(id);

    const numId = parseInt(id, 10);
    return c.json(await licenseController.getOneById(numId));
  }
);

export default app;
