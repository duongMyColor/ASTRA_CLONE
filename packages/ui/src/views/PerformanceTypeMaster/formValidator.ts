import validateForm, { ValidationRule } from '@repo/utils/formValidator';
import { RecordValue } from '@repo/types/general';

const editionRules: ValidationRule[] = [
  {
    field: 'typeName',
    required: true,
  },
];

const creationRules: ValidationRule[] = [
  {
    field: 'typeName',
    required: true,
  },
];

const validateUserCreation = (values: RecordValue): RecordValue => {
  return validateForm(values, creationRules);
};

const validateUserEdition = (values: RecordValue): RecordValue => {
  return validateForm(values, editionRules);
};

export { validateUserCreation, validateUserEdition };
