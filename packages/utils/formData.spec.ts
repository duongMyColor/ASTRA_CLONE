import { RAFile, RecordValue } from '@repo/types/general';
import removeEmptyProperties from '@repo/utils/removeEmptyProperties';

const extractFile = (value: RAFile) => {
  return value.rawFile;
};

export const convertToFormData = (
  values: RecordValue,
  fileKeyName: string[] | null = null
) => {
  const validValues = removeEmptyProperties(values);

  console.log('validValues', validValues);

  const formData = new FormData();

  for (const key in validValues) {
    const value = validValues[key] as any;
    if (fileKeyName?.includes(key)) {
      formData.append(key, extractFile(value));
    } else {
      formData.append(key, value);
    }
  }

  return formData;
};

export const logFormData = (formData: FormData) => {
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
};
