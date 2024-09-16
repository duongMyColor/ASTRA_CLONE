import {
  AuthFailureError,
  BadRequestError,
  InternalServerError,
} from '@/core/error.response';
import { getPASSWORD, getUSERNAME } from '@/lib/globalObject';
import { createMiddleware } from 'hono/factory';

/**
 * Shows how to restrict access using the HTTP Basic schema.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
 * @see https://tools.ietf.org/html/rfc7617
 *
 * A user-id containing a colon (":") character is invalid, as the
 * first colon in a user-pass string separates user and password.
 */

/**
 * Receives a HTTP request and replies with a response.
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export const basicAuthMiddware = createMiddleware(async (c, next) => {
  const Authorization = c.req.header('Authorization');

  if (!Authorization) {
    throw new BadRequestError('Authorization header is missing.');
  }

  const { user, pass } = basicAuthentication(Authorization);

  verifyCredentials(user, pass);

  await next();
});

/**
 * Throws exception on verification failure.
 * @param {string} user
 * @param {string} pass
 * @throws {AuthFailureError}
 */
export const verifyCredentials = (user: string, pass: string) => {
  const USERNAME = getUSERNAME();
  if (!USERNAME) {
    throw new InternalServerError(
      'Not found USERNAME in environment variables.'
    );
  }

  if (USERNAME !== user) {
    throw new AuthFailureError('Invalid credentials.');
  }

  const PASSWORD = getPASSWORD();

  if (!PASSWORD) {
    throw new InternalServerError(
      'Not found PASSWORD in environment variables.'
    );
  }

  if (PASSWORD !== pass) {
    throw new AuthFailureError('Invalid credentials.');
  }
};

/**
 * Parse HTTP Basic Authorization value.
 * @param Authorization:  request Authorization
 * @throws {BadRequestError}
 * @returns {{ user: string, pass: string }}
 */
export const basicAuthentication = (
  Authorization: string
): {
  user: string;
  pass: string;
} => {
  const [scheme, encoded] = Authorization.split(' ');

  // The Authorization header must start with Basic, followed by a space.
  if (!encoded || scheme !== 'Basic') {
    throw new BadRequestError('Malformed authorization header.');
  }

  // Decodes the base64 value and performs unicode normalization.
  // @see https://datatracker.ietf.org/doc/html/rfc7613#section-3.3.2 (and #section-4.2.2)
  // @see https://dev.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
  const buffer = Uint8Array.from(atob(encoded), (character) =>
    character.charCodeAt(0)
  );
  const decoded = new TextDecoder().decode(buffer).normalize();

  // The username & password are split by the first colon.
  //=> example: "username:password"
  const index = decoded.indexOf(':');

  // The user & password are split by the first colon and MUST NOT contain control characters.
  // @see https://tools.ietf.org/html/rfc5234#appendix-B.1 (=> "CTL = %x00-1F / %x7F")
  if (index === -1 || /[\0-\x1F\x7F]/.test(decoded)) {
    throw new BadRequestError('Invalid authorization value.');
  }

  return {
    user: decoded.substring(0, index),
    pass: decoded.substring(index + 1),
  };
};
