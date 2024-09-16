import { userContentLength } from '@repo/consts/user';
import { ValidationRule } from '@repo/utils/formValidator';
import { validatePassword } from '@repo/utils/password';
import { RecordValue } from '@repo/types/general';
import { validateVersion } from '@repo/utils/validateVersion';
import { validatePublishedDate } from '@repo/utils/validatePublishedDate';
import validateForm from './validateField';

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
    field: 'managementName',
    required: true,
  },
  {
    field: 'operateSystem',
    required: true,
  },
];

const creationRules: ValidationRule[] = [
  {
    field: 'appMasterId',
    required: true,
  },
  {
    field: 'version',
    required: true,
  },
  {
    field: 'publishedDate',
    required: true,
  },
  {
    field: 'managementName',
    required: true,
  },
  {
    field: 'operateSystem',
    required: true,
  },
];

const validateForceUpdateCreation = (
  values: any,
  field: string,
  option?: { values?: any }
): any => {
  const ruleField = creationRules.find((element) => element.field === field);

  const baseValidation = validateForm(
    values,
    ruleField as ValidationRule,
    option?.values
  );

  return baseValidation;
};

export { validateForceUpdateCreation };
