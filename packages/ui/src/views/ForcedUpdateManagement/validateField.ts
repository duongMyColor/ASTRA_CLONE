import { RecordValue } from '@repo/types/general';
import { ValidationRule } from '@repo/utils/formValidator';
import { validatePassword } from '@repo/utils/password';
import { validatePublishedDate } from '@repo/utils/validatePublishedDate';
import { validateVersion } from '@repo/utils/validateVersion';

const validateRequired = (value: string, required: boolean) => {
  return required && !value ? { message: '必須' } : null;
};

const validateLength = (
  value: string,
  minLength: number,
  maxLength: number
) => {
  if (minLength && value?.length < minLength) {
    return {
      message: `${minLength}文字以上である必要があります`,
      args: { min: minLength },
    };
  }
  if (maxLength && value?.length > maxLength) {
    return {
      message: `${maxLength}文字以内である必要があります`,
      args: { max: maxLength },
    };
  }
  return null;
};

const validateForm = (
  value: string,
  rules: ValidationRule,
  options: any
): RecordValue => {
  let errors = null as any;

  console.log({ options });

  const {
    field,
    required,
    minLength = 0,
    maxLength = Infinity,
    minValue,
    maxValue,
  } = rules;

  console.log({ options });
  errors =
    validateRequired(value, required) ??
    validateLength(value, minLength, maxLength);

  if (field === 'version') {
    const validateVersions = validateVersion(options);

    if (validateVersions !== true) {
      errors = {
        message: validateVersions,
      };
    }
  }
  if (field === 'publishedDate') {
    const validatePublishedDates = validatePublishedDate(options);

    if (validatePublishedDates !== true) {
      errors = {
        message: validatePublishedDates,
      };
    }
  }

  console.log({ errors });
  return errors?.message;
};

export default validateForm;
