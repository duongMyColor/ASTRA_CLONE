import {
  compareObjects,
  convertToRawValue,
  convertObjectToRawValues,
  convertFormDataToObject,
} from './objectUtils';

describe('objectUtils', () => {
  describe('compareObjects', () => {
    it('compares two arrays of objects correctly', () => {
      const oldArray = [
        { id: 1, name: 'Trung' },
        { id: 2, name: 'Mycolor' },
      ];
      const newArray = [
        { id: 1, name: 'Trung pham' },
        { id: 3, name: 'MiraiPlay' },
      ];

      const result = compareObjects(oldArray, newArray);

      expect(result).toEqual({
        added: [{ id: 3, name: 'MiraiPlay' }],
        removed: [{ id: 2, name: 'Mycolor' }],
        changed: [{ id: 1, name: 'Trung pham' }],
      });
    });
  });

  describe('convertToRawValue', () => {
    it('converts a string to its raw value correctly', () => {
      expect(convertToRawValue('123')).toBe(123);
      expect(convertToRawValue('true')).toBe(true);
      expect(convertToRawValue('false')).toBe(false);
      expect(convertToRawValue('undefined')).toBe(undefined);
      expect(convertToRawValue('null')).toBe(null);
      expect(convertToRawValue('hello')).toBe('hello');
    });
  });

  describe('convertObjectToRawValues', () => {
    it('assigns Blob values directly', () => {
      const blob = new Blob(['blob content'], { type: 'text/plain' });
      const file = new File([blob], 'filename.txt', { lastModified: new Date().getTime() });
      const obj = { a: file };
      const result = convertObjectToRawValues(obj);

      expect(result).toEqual({ a: file });
    });
  });

  describe('convertFormDataToObject', () => {
    it('converts FormData to an object correctly', () => {
      const formData = new FormData();
      formData.append('a', '123');
      formData.append('b', 'true');
      formData.append('c', 'hello');

      const result = convertFormDataToObject(formData);

      expect(result).toEqual({ a: 123, b: true, c: 'hello' });
    });
  });
});
