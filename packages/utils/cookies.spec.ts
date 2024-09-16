import { getClientCookieValue } from './cookies';

describe('getClientCookieValue', () => {
  beforeEach(() => {
    // Clear all cookies before test
    document.cookie = '';
  });

  test('returns the value of an existing cookie', () => {
    // Set a cookie
    document.cookie = 'x-client-id=randomid';

    const cookieValue = getClientCookieValue('x-client-id');

    expect(cookieValue).toBe('randomid');
  });

  test('returns null for a non-existing cookie', () => {
    const cookieValue = getClientCookieValue('nonExistingCookie');

    expect(cookieValue).toBeNull();
  });

  test('returns the correct value when multiple cookies exist', () => {
    // Set multi cookies
    document.cookie = 'cookie1=value1';
    document.cookie = 'cookie2=value2';
    document.cookie = 'cookie3=value3';

    const cookieValue = getClientCookieValue('cookie2');

    expect(cookieValue).toBe('value2');
  });

  test('returns null when no cookies exist', () => {
    const cookieValue = getClientCookieValue('notExistingCookie');

    expect(cookieValue).toBeNull();
  });
});
