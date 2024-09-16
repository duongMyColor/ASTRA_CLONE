import { userContentLength } from '@repo/consts/user';
import validateForm, { ValidationRule } from '@repo/utils/formValidator';
import { validatePassword } from '@repo/utils/password';
import { RecordValue } from '@repo/types/general';
import { validateVersionTermAndLicense } from '@repo/utils/validateVersionTermAndLicense';

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
];

const validateCreation = async (values: RecordValue) => {
  const baseValidation = validateForm(values, creationRules);
  const validateVersions = await validateVersionTermAndLicense(
    values,
    'licenses'
  );
  const validationMessages = { ...baseValidation };

  if (!validateVersions) {
    validationMessages.version = validationMessages.version
      ? '必須'
      : '数値である必要があり、前のバージョンより大きくなければなりません';
  }
  return validationMessages;
};

const validateUserEdition = (values: RecordValue): RecordValue => {
  return validateForm(values, editionRules);
};

export { validateCreation, validateUserEdition };
