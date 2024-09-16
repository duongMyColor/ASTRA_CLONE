import validateForm, { ValidationRule } from '@repo/utils/formValidator';
import { validatePassword } from '@repo/utils/password';
import { RecordValue } from '@repo/types/general';
import { validateTypeFile } from '@repo/utils/validateTypeFile';

const editionRules: ValidationRule[] = [
  {
    field: 'name',
    required: true,
  },
  {
    field: 'performanceTypeMasterId',
    required: true,
  },
  {
    field: 'assetDataIOS',
    required: true,
  },
  {
    field: 'assetDataAndroid',
    required: true,
  },
  {
    field: 'acstaId',
    required: true,
  },
];

const creationRules: ValidationRule[] = [
  {
    field: 'name',
    required: true,
  },
  {
    field: 'performanceTypeMasterId',
    required: true,
  },
  {
    field: 'assetBundleIOS',
    required: true,
  },
  {
    field: 'assetBundleAndroid',
    required: true,
  },
  {
    field: 'acstaId',
    required: true,
  },
];

const validateCreation = async (values: RecordValue) => {
  const baseValidation = validateForm(values, creationRules);

  const validateFileIOS = await validateTypeFile(
    values.assetBundleIOS?.rawFile?.path,
    'performanceManagement'
  );
  const validateFileAndroid = await validateTypeFile(
    values.assetBundleAndroid?.rawFile?.path,
    'performanceManagement'
  );

  const validationMessages = { ...baseValidation };

  if (validateFileIOS === false) {
    validationMessages.assetBundleIOS = 'ファイルの種類が正しくありません';
  }

  if (validateFileAndroid === false) {
    validationMessages.assetBundleAndroid = 'ファイルの種類が正しくありません';
  }

  return validationMessages;
};

const validateUserEdition = async (values: RecordValue) => {
  const baseValidation = validateForm(values, editionRules);

  const validateFileIOS = await validateTypeFile(
    values?.assetDataIOS?.rawFile?.path,
    'performanceManagement'
  );
  const validateFileAndroid = await validateTypeFile(
    values?.assetDataAndroid?.rawFile?.path,
    'performanceManagement'
  );

  const validationMessages = { ...baseValidation };

  if (validateFileIOS === false) {
    validationMessages.assetDataIOS = 'ファイルの種類が正しくありません';
  }

  if (validateFileAndroid === false) {
    validationMessages.assetDataAndroid = 'ファイルの種類が正しくありません';
  }

  return validationMessages;
};

export { validateCreation, validateUserEdition };
