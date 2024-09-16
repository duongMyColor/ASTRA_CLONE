import { parseSearchParams, parseParams } from './parseParams';

describe('parseParams', () => {
  describe('parseSearchParams', () => {
    it('parses search parameters correctly', () => {
      const params = new URLSearchParams();
      params.append(
        '{"sort":"[\\"id\\",\\"ASC\\"]","range":"[0,9]","filter":"{\\"id\\":\\"1\\"}"}',
        ''
      );

      const result = parseSearchParams(params);

      expect(result).toEqual({
        sort: ['id', 'ASC'],
        range: [0, 9],
        filter: { id: '1' },
      });
    });
  });

  describe('parseParams', () => {
    it('parses parameters correctly', () => {
      const params = new URLSearchParams();
      params.append('{"id":"1","name":"Trung"}', '');

      const result = parseParams(params);

      expect(result).toEqual({ id: '1', name: 'Trung' });
    });
  });
});
