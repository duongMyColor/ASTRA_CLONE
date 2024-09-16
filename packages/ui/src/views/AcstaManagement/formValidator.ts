import validateForm, { ValidationRule } from '@repo/utils/formValidator';
import { RecordValue } from '@repo/types/general';
import { validatePublicDateAcsta } from '@repo/utils/validatePublicDateAcsta';

const editionRules: ValidationRule[] = [
  {
    field: 'managementName',
    required: true,
  },
  {
    field: 'applicationId',
    required: true,
  },
  {
    field: 'acstaName',
    required: true,
  },
  {
    field: 'dateStart',
    required: true,
  },
  {
    field: 'thumbnailUrl',
    required: true,
  },
  {
    field: 'scanImageUrl',
    required: true,
  },
];

const creationRules: ValidationRule[] = [
  {
    field: 'managementName',
    required: true,
  },

  {
    field: 'applicationId',
    required: true,
  },
  {
    field: 'acstaName',
    required: true,
  },
  {
    field: 'thumbnailUrl',
    required: true,
  },
  {
    field: 'scanImageUrl',
    required: true,
  },
  {
    field: 'dateStart',
    required: true,
  },
];

const validateAcstaCreation = (values: RecordValue): RecordValue => {
  const baseValidation = validateForm(values, creationRules);
  const validatePublicDateEnd = validatePublicDateAcsta(values);
  const validationMessages = { ...baseValidation };

  if (!validatePublicDateEnd) {
    validationMessages.dateEnd = '公開終了日は公開開始日より前に設定できません';
  }
  return validationMessages;
};

const validateAcstaEdition = (values: RecordValue): RecordValue => {
  const baseValidation = validateForm(values, editionRules);
  const validatePublicDateEnd = validatePublicDateAcsta(values);
  const validationMessages = { ...baseValidation };

  if (!validatePublicDateEnd) {
    validationMessages.dateEnd = '公開終了日は公開開始日より前に設定できません';
  }
  return validationMessages;
};

export { validateAcstaCreation, validateAcstaEdition };
