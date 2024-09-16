import { generateRandomId, roundNumberWith5Decimals } from './number';

describe('number', () => {
  describe('generateRandomId', () => {
    it('generates a random id', () => {
      const id = generateRandomId();
      expect(id).toBeGreaterThanOrEqual(0);
      expect(id).toBeLessThan(100000);
    });
  });

  describe('roundNumberWith5Decimals', () => {
    it('rounds a number to 5 decimal places', () => {
      const number = 1.123456789;
      const roundedNumber = roundNumberWith5Decimals(number);
      expect(roundedNumber).toBe(1.12346);
    });
  });
});
