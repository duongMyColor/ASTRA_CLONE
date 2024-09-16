import termsOfUseController from '@/controllers/termOfUse.controller';
import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { ParamsSchema, ResponseSchema } from '@/openapi/terms-of-use';
import { BadRequestError } from '@/core/error.response';
import { Authorization, securitySchemes } from '@/openapi';
const app = new OpenAPIHono();

// app.openapi(
//   createRoute({
//     method: 'get',
//     path: '/',
//     responses: {
//       200: {
//         content: {
//           'application/json': {
//             schema: z.object({
//               message: z
//                 .string()
//                 .openapi({ example: 'get all Term Of Use success!' }),
//               status: z.number().openapi({ example: 200 }),
//               reason: z.string().openapi({ example: 'OK' }),
//               metadata: z.array(
//                 z.object({
//                   id: z.number().openapi({ example: 1 }),
//                   memo: z.string().openapi({ example: 'memo' }),
//                   version: z.string().openapi({ example: '1' }),
//                   content: z.string().openapi({
//                     example: 'term-of-use/1716091800044/demo.html',
//                   }),
//                   publishedDate: z
//                     .string()
//                     .transform((val) => new Date(val))
//                     .openapi({ example: '2024-05-19T04:09:00.000Z' }),
//                   createdAt: z
//                     .string()
//                     .transform((val) => new Date(val))
//                     .openapi({ example: '2024-05-19T04:10:00.130Z' }),
//                   updatedAt: z
//                     .string()
//                     .transform((val) => new Date(val))
//                     .openapi({ example: '2024-05-19T04:10:00.097Z' }),
//                 })
//               ),
//             }),
//           },
//         },
//         description: 'Ok Response',
//       },
//     },
//   }),
//   async (c): Promise<any> => {
//     return c.json(await termsOfUseController.getAll());
//   }
// );

app.openapi(
  createRoute({
    method: 'get',
    path: '/latest',
    description: 'Get the latest Term Of Use',
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
    tags: ['Term Of Use'],
  }),
  async (c): Promise<any> => {
    return c.json(await termsOfUseController.getCurrentTermOfUse());
  }
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    description: 'Get Term Of Use by id',
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
    tags: ['Term Of Use'],
  }),
  async (c): Promise<any> => {
    const id = c.req.param('id');

    if (!id) {
      throw new BadRequestError('Invalid id');
    }

    const numId = parseInt(id, 10);
    return c.json(await termsOfUseController.getOneById(numId));
  }
);

export default app;
