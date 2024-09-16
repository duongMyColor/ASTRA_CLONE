import { createMiddleware } from 'hono/factory';
import { basicAuthentication, verifyCredentials } from '.';

export const swaggerBasicAuth = createMiddleware(async (c, next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    return c.text('Unauthorized', 401, {
      'WWW-Authenticate': 'Basic realm="Restricted Area"',
    });
  }

  if (!authHeader?.startsWith('Basic ')) {
    return c.text('Unauthorized', 401, {
      'WWW-Authenticate': 'Basic realm="Restricted Area"',
    });
  }
  const { user, pass } = basicAuthentication(authHeader);

  
  verifyCredentials(user, pass);

  await next();
});
