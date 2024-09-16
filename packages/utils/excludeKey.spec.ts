import { exclude } from './excludeKey'; // Adjust the import path as needed

describe('excludeKey', () => {
  it('should exclude specified keys from an object', () => {
    const user = {
      id: 1,
      username: 'superadmin',
      email: 'superadmin@example.com',
      role: 'admin',
    };

    const keysToExclude = ['email', 'role'];

    const result = exclude(user, keysToExclude);

    expect(result).toEqual({
      id: 1,
      username: 'superadmin',
    });
  });

  it('should return the original object if no keys are specified', () => {
    const user = {
      id: 1,
      username: 'trungpham',
    };

    const result = exclude(user, []);

    expect(result).toEqual(user);
  });
});
