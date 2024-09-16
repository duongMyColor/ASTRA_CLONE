import * as crypto from 'crypto';
import { hashPassword, validatePassword } from './password';

describe('password', () => {
  describe('hashPassword', () => {
    it('hashes the password correctly', () => {
      const password = 'Password123';
      const hashedPassword = hashPassword(password);

      const expectedHash = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');

      expect(hashedPassword).toBe(expectedHash);
    });
  });

  describe('validatePassword', () => {
    it('validates the password correctly', () => {
      const validPassword = 'Password123';
      const invalidPassword = 'password';

      expect(validatePassword(validPassword)).toBe(true);
      expect(validatePassword(invalidPassword)).toBe(false);
    });
  });
});
