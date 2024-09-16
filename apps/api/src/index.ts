import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import type { ErrorResponse } from '@repo/types/response';
import { bearerAuth } from 'hono/bearer-auth';
import { createMiddleware } from 'hono/factory';
import type { Env } from 'hono/types';
import { basicAuthMiddware } from './auth';
import { swaggerBasicAuth } from './auth/swaggerAuth';
import { generateS3Client } from './lib/cloudflare-r2';
import { globalObject } from './lib/globalObject';
import { generatePrismaClient } from './lib/prisma';
import routes from './routes';

type Bindings = {
  DB: D1Database;
  CLOUDFLARE_ACCOUNT_ID: string;
  CLOUDFLARE_ACCESS_KEY_ID: string;
  CLOUDFLARE_SECRET_ACCESS_KEY: string;
  CLOUDFLARE_BUCKET_NAME: string;
  bundleId: string;
  USERNAME: string;
  PASSWORD: string;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>();

// Handle global error
app.onError((err: ErrorResponse, c) => {
  return c.json(
    {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    },
    err?.status || 500
  );
});

// Add security scheme
app.openAPIRegistry.registerComponent(
  'securitySchemes',
  'BasicAuth', // <- Add security name
  {
    type: 'apiKey',
    name: 'Authorization',
    in: 'header',
  }
);

app.use(
  globalObject.store<Env>((c) => ({
    USERNAME: c.env?.USERNAME as string,
    PASSWORD: c.env?.PASSWORD as string,
  }))
);
// Add swagger ui for dev
app.use(
  '/ui',
  createMiddleware(async (c, next) => {
    return next();
  })
);
// Config auth for swagger ui
app.use('/ui', swaggerBasicAuth);
app.use(
  '/doc',
  bearerAuth({
    token: 'bearer-token',
  })
);
app.doc('/doc', {
  info: {
    title: 'An API',
    version: 'v1',
  },
  openapi: '3.1.0',
});
app.get(
  '/ui',
  swaggerUI({
    url: '/doc',
    requestInterceptor: `
      request => {
        if (request.url === '/doc') {
          request.headers['authorization'] = \`Bearer bearer-token\`;
        }
        return request;
      }
    `,
  })
);

// API basic auth
app.use(basicAuthMiddware);

// Init global object
app.use(
  globalObject.store<Env>((c) => ({
    bundleId: c.req.query('bundleId') as string,
    db: generatePrismaClient(c.env?.DB as D1Database),
    s3client: generateS3Client(
      c.env?.CLOUDFLARE_ACCOUNT_ID as string,
      c.env?.CLOUDFLARE_ACCESS_KEY_ID as string,
      c.env?.CLOUDFLARE_SECRET_ACCESS_KEY as string
    ),
    bucketName: c.env?.CLOUDFLARE_BUCKET_NAME as string,
  }))
);

// Add root route
app.route('/api/v1', routes);

// root route
app.get('/', (c) => {
  return c.json({ message: 'Acsta API' });
});

export default app;
