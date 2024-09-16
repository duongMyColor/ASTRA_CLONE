import { RecordValue } from '@repo/types/general';
import removeEmptyProperties from '@repo/utils/removeEmptyProperties';
import { email as mailCheck } from 'react-admin';

export type ValidationRule = {
  field: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  match?: string;
  unMatchMessage?: string;
  minValue?: number;
  maxValue?: number;
};

const validateRequired = (value: string, required: boolean) => {
  return required && !value ? 'ra.validation.required' : null;
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

const validateMatch = (
  value: string,
  matchValue: string,
  unMatchMessage: string
) => {
  return matchValue && value !== matchValue
    ? unMatchMessage || '値が一致しません'
    : null;
};

const validateEmail = (email: string) => {
  return mailCheck()(email) || null;
};

const validateValue = (
  value: number,
  minValue: number | undefined,
  maxValue: number | undefined
) => {
  if (minValue !== undefined && value < minValue) {
    return `値は以上である必要があります ${minValue}`;
  }
  if (maxValue !== undefined && value > maxValue) {
    return `値は以上である必要があります ${maxValue}`;
  }
  return null;
};

const validateForm = (
  values: RecordValue,
  rules: ValidationRule[]
): RecordValue => {
  const errors = {} as any;

  rules.forEach((rule) => {
    const {
      field,
      required,
      minLength = 0,
      maxLength = Infinity,
      match = '',
      minValue,
      maxValue,
    } = rule;
    const value = values[field];

    errors[field] =
      validateRequired(value, required) ??
      validateLength(value, minLength, maxLength) ??
      validateMatch(value, values[match], 'パスワードが一致しません');

    if (minValue !== undefined || maxValue !== undefined) {
      const error = validateValue(value, minValue, maxValue);
      if (error) {
        errors[field] = error;
      }
    }

    if (field === 'email') {
      const emailError = validateEmail(value);
      if (emailError) {
        errors[field] = emailError;
      }
    }
  });

  return removeEmptyProperties(errors);
};

export default validateForm;
