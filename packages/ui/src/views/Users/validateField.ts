import { RecordValue } from '@repo/types/general';
import { ValidationRule } from '@repo/utils/formValidator';
import { validatePassword } from '@repo/utils/password';

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
const validateConfirmPassword = (
  confirmPassword: string,
  password: string,
  field: string
) => {
  if (!confirmPassword && field !== 'confirmNewPassword')
    return { message: '必須' };

  if (confirmPassword === password) return null;

  return { message: 'パスワードが一致しません' };
};
const validateEmail = (email: string) => {
  let error = null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    error = { message: 'メールアドレスである必要があります' };
  }

  return error;
};
const validateValueNumber = (
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
  value: string,
  rules: ValidationRule,
  password: string
): RecordValue => {
  let errors = null as any;

  const {
    field,
    required,
    minLength = 0,
    maxLength = Infinity,
    minValue,
    maxValue,
  } = rules;

  errors =
    validateRequired(value, required) ??
    validateLength(value, minLength, maxLength);

  if (field === 'email') {
    const emailError = validateEmail(value);

    if (emailError) {
      errors = emailError;
    }
  }
  if (field === 'password' || field === 'newPassword') {
    const passwordError = validatePassword(value, field);

    errors = passwordError;
  }
  if (field === 'confirmPassword' || field === 'confirmNewPassword') {
    const confirmPasswordError = validateConfirmPassword(
      value,
      password,
      field
    );
    errors = confirmPasswordError;
  }

  return errors?.message;
};

export default validateForm;
