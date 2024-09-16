import { userContentLength } from '@repo/consts/user';
import validateForm, { ValidationRule } from '@repo/utils/formValidator';
import { validateVersionTermAndLicense } from '@repo/utils/validateVersionTermAndLicense';
import { RecordValue } from '@repo/types/general';

const editionRules: ValidationRule[] = [
  {
    field: 'version',
    required: true,
  },
  {
    field: 'publishedDate',
    required: true,
  },
  {
    field: 'content',
    required: true,
  },
  {
    field: 'memo',
    required: true,
  },
];

const creationRules: ValidationRule[] = [
  {
    field: 'version',
    required: true,
  },
  {
    field: 'publishedDate',
    required: true,
  },
  {
    field: 'content',
    required: true,
  },
  {
    field: 'memo',
    required: false,
  },
];

const validateCreation = async (values: RecordValue) => {
  const baseValidation = validateForm(values, creationRules);
  const validateVersions = await validateVersionTermAndLicense(
    values,
    'term-of-uses'
  );
  const validationMessages = { ...baseValidation };

  if (!validateVersions) {
    validationMessages.version = validationMessages.version
      ? '必須'
      : '数値である必要があり、前のバージョンより大きくなければなりません';
  }
  return validationMessages;
};

const validateEdition = (values: RecordValue): RecordValue => {
  return validateForm(values, editionRules);
};

export { validateCreation, validateEdition };
