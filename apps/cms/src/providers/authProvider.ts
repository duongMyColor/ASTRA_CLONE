import { HEADER } from '@repo/consts/access';
import { getClientCookieValue } from '@repo/utils/cookies';
import type { AuthProvider } from 'react-admin';
import { fetchUtils } from 'react-admin';
import { generateRole } from '../views/_core/permissions';

const apiUrl = `/api`;
const httpClient = fetchUtils.fetchJson;

const authProvider: AuthProvider = {
  // authentication
  login: async (params) => {
    const { username, password } = params;
    const request = new Request(`${apiUrl}/access/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      // headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    try {
      const { json } = await httpClient(request);

      const {
        metadata: {
          user: { id },
          tokens: { accessToken, refreshToken },
        },
      } = json;

      // Set cookie
      document.cookie = `${HEADER.CLIENT_ID}=${id}; path=/`;
      document.cookie = `${HEADER.AUTHORIZATION}=${accessToken}; path=/`;
      document.cookie = `${HEADER.REFRESHTOKEN}=${refreshToken}; path=/`;

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      return Promise.reject({ message: 'Unauthorized user!' });
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },

  checkAuth: async () => {
    const request = new Request(`${apiUrl}/access/auth`, {
      method: 'POST',
    });

    try {
      const { json } = await httpClient(request);
      console.log({ json });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  logout: async () => {
    const request = new Request(`${apiUrl}/access/logout`, {
      method: 'POST',
    });

    try {
      const { json } = await httpClient(request);
      console.log({ json });

      return Promise.resolve();
    } catch (error) {
      console.log({ error });
    }
  },

  getIdentity: async () => {
    const userId = getClientCookieValue(HEADER.CLIENT_ID);

    const request = new Request(`${apiUrl}/users/${userId}`, {
      method: 'GET',
    });

    try {
      const {
        json: {
          metadata: { id, username },
        },
      } = await httpClient(request);

      return Promise.resolve({
        id,
        fullName: username,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // authorization
  getPermissions: async () => {
    const request = new Request(`${apiUrl}/access/permission`, {
      method: 'GET',
    });

    try {
      const { json } = await httpClient(request);

      return Promise.resolve(generateRole(json.metadata.role));
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default authProvider;
