import removeEmptyProperties from './removeEmptyProperties';

describe('removeEmptyProperties', () => {
  it('removes properties with null or undefined values', () => {
    const obj = {
      a: 'value',
      b: null,
      c: undefined,
      d: 0,
    };

    const result = removeEmptyProperties(obj as any);

    expect(result).toEqual({ a: 'value', d: 0 });
  });
});
